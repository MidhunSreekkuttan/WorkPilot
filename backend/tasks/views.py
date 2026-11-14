from pathlib import Path
from io import BytesIO

from django.db import transaction
from django.db.models import Count, Q
from django.http import FileResponse
from django.shortcuts import get_object_or_404
from django.utils import timezone

from rest_framework import status
from rest_framework.exceptions import PermissionDenied, ValidationError
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from activity.models import ActivityLog
from notifications.models import Notification
from .models import Task, TaskComment, TaskAttachment

from .permissions import (
    get_project_context,
    get_task_context, 
    require_manager,
    require_assigned_member,
)

from .serializers import (
    TaskSerializer,
    TaskWriteSerializer,
    TaskStatusUpdateSerializer,
    TaskCommentSerializer,
    TaskAttachmentSerializer,
    TaskAttachmentUploadSerializer
)

# helper
def get_task_queryset(project):
    
    return (
        Task.objects.filter(project=project).select_related(
            "project",
            "created_by",
            "assigned_to__user"
        ).annotate(
            attachments_count=Count("attachments", distinct=True),
            comments_count=Count("comments", distinct=True)
        ).order_by("-created_at")
    )
    
def create_task_activity(workspace, actor, task, action, summery, metadata=None):
    
    ActivityLog.objects.create(
        workspace=workspace,
        actor=actor,
        action=action,
        target_type="task",
        target_id=str(task.id),
        summary=summery,
        metadata=metadata or {}
    )
    
def create_task_notification(recipient, actor, workspace, kind, title, body, task):
    
    if not recipient or recipient == actor:
        return
    
    Notification.objects.create(
        recipient=recipient,
        actor=actor,
        workspace=workspace,
        kind=kind,
        title=title,
        body=body,
        target_url="",
        data={
            "task_id":str(task.id),
            "project_id":str(task.project_id)
        }
    )
    
def sync_task_completion(task):
    
    if task.status == Task.Status.COMPLETED:
        
        if not task.complete_at:
            task.complete_at = timezone.now()
            task.save(update_fields=["completed_at", "updated_at"])
        elif task.complete_at:
            task.complete_at = None
            task.save(updated_fields=["completed_at", "updated_at"])
            
# Task List / Create
class TaskListCreateView(APIView):
    permission_classes=[IsAuthenticated]
    
    def get(self, request, workspace_id, project_id):
        membership, project = get_project_context(
            request.user,
            workspace_id,
            project_id
        )
        
        tasks = get_task_queryset(project)
        
        # Status filter
        status_filter = request.query_params.get("status", "").strip().lower()
        
        if status_filter and status_filter != "all":
            
            tasks = tasks.filter(status=status_filter)
            
        # Priority filter
        priority_filter = request.query_params.get("priority").strip().lower()
        
        if priority_filter and priority_filter != "all":
            tasks = tasks.filter(priority=priority_filter)
            
        # Search
        search = request.query_params.get("search", "").strip().lower()
        
        if search:
            tasks = tasks.filter(
                Q(title__icontains=search) | Q(description__icontains=search)
            )
            
        # Current member's assigned tasks
        mine = request.query_params.get("mine", "").strip().lower()
        
        if mine in ("true", "1"):
            tasks = tasks.filter(assigned_to=membership)
            
        # Filter by a particular workspace membership
        assignee = request.query_params.get("assignee", "").strip()
        
        if assignee:
            tasks = tasks,filter("overdue", "").strip().lower()
            
        # Overdue tasks
        overdue = request.query_params.get("overdue", "").strip().lower()
        
        if overdue:
            tasks = tasks.filter(due_date__lt=timezone.now()).exclude(status=Task.Status.COMPLETED)
            
        # Ordering
        ordering = request.query_params.get("ordering", "-created_at")
        
        allowed_ordering = {
            "created_at",
            "-created_at",
            "due_date",
            "-due_date",
            "priority",
            "-priority",
            "title",
            "-title",
        }
        
        if ordering not in allowed_ordering:
            ordering = "-created_at"
            
        tasks = tasks.order_by(ordering)
        
        serializers = TaskSerializer(tasks, many=True)
        
        return Response(serializers.data, status=status.HTTP_200_OK)
    
    @transaction.atomic
    def post(self, request, workspace_id, project_id):
        
        membership, project = get_project_context(
            request.user,
            workspace_id,
            project_id
        )
        
        require_manager(membership)
        
        serializer = TaskWriteSerializer(
            data=request.data,
            context={
                "request": request,
                "project": project
            }
        )
        serializer.is_valid(raise_exception=True)
        task = serializer.save()
        
        # Activity log
        create_task_activity(
            workspace=membership.workspace,
            actor=request.user,
            task=task,
            action="task.created",
            summery=f'Created task "{task.title}"',
            metadata={
                "status":task.status,
                "priority":task.priority
            }
        )
        
        # Notify assignee
        if task.assigned_to:
            create_task_notification(
                recipient=task.assigned_to.user,
                actor=request.user,
                workspace=membership.workspace,
                kind="Task_assigned",
                title="New Task Assigned",
                body=f'You have been assigned "{task.title}"',
                task=task
            )
            
        task = get_task_queryset(project).get(id=task.id)
        
        return Response(TaskSerializer(task).data, status=status.HTTP_201_CREATED)
    
    # Task Detail / Update / Delete
class TaskDetailView(APIView):
    permission_classes=[IsAuthenticated]
        
    def get(self, request, workspace_id, project_id, task_id):
        _, project, task = get_task_context(
            request.user,
            project_id,
            workspace_id,
            task_id
        )
            
        task = get_task_queryset(project).get(id=task.id)
            
        serializer = TaskSerializer(task)
            
        return Response(serializer.data, status=status.HTTP_200_OK)
        
    @transaction.atomic
    def patch(self, request, workspace_id, project_id, task_id):
        membership, project, task = get_task_context(
            request.user,
            workspace_id,
            project_id,
            task_id
            )
            
        previous_status = task.status
        previous_assignee_id = task.assigned_to_id
            
        if membership.role == membership.Role.MANAGER:
            # Managers can update all task details.
            serializer = TaskWriteSerializer(
                task,
                data=request.data,
                partial=True,
                context={
                    "request":request,
                    "project":project
                }
            )
        else:
            # Members can update only their own assigned task status.
            require_assigned_member(membership, task)
                
            extra_fields = (set(request.data.keys())) - {"status"}
                
            if extra_fields:
                raise ValidationError({
                        "detail":("Members can only update the task status.")
                })
                    
            serializer = TaskStatusUpdateSerializer(
                task,
                data=request.data,
                partial=True
            )
                
            serializer.is_valid(raise_exception=True)
                
            task = serializer.save()
                
            sync_task_completion(task)
                
            # Activity log
            if previous_status != task.status:
                create_task_activity(
                    workspace=membership.workspace,
                    actor=request.user,
                    task=task,
                    action="task.status_updated",
                    summery=(
                        f'Changed "{task.title}" status'
                        f'from {previous_status} to {task.status}.'
                    ),
                    metadata={
                        "old_status": previous_status,
                        "new_status": task.status
                    }
                )
                    
                # Notify the task creator when another user changes status.
                create_task_notification(
                    recipient=task.created_by,
                    actor=request.user,
                    workspace=membership.workspace,
                    kind="task_status_updated",
                    title="Task status updated",
                    body=(
                        f'"{task.title}" is now'
                        f'{task.get_status_display()}.'
                    ),
                    task=task
                )
                    
            # Notify newly assigned member.
            if previous_assignee_id != task.assigned_to_id:
                create_task_activity(
                    workspace=membership.workspace,
                    actor=request.user,
                    task=task,
                    action="tsak.assigned",
                    summery=f'Updated assingee for "{task.title}"'
                )
                    
                if task.assigned_to:
                    create_task_notification(
                        recipient=task.assigned_to.user,
                        actor=request.user,
                        workspace=membership.workspace,
                        kind="task_assigned",
                        title="Task assigned to you",
                        body=f'You have been assigned "{task.title}".',
                        task=task
                    )
                        
            task = get_task_queryset(project).get(id=task.id)
                
            return Response(TaskSerializer(task).data, status=status.HTTP_200_OK)
            
    def delete(self, request, workspace_id, project_id, task_id):
            
            membership, _, task = get_task_context(
                request.user,
                workspace_id,
                project_id,
                task_id
            )
              
            require_manager(membership)
              
            task_title = task.title
            task_id_value = str(task.id)
              
            task.delete()
              
            ActivityLog.objects.create(
                workspace=membership.workspace,
                actor=request.user,
                action="task.delete",
                target_type="task",
                target_id=task_id_value,
                summary=f'Delete task "{task_title}"'
            )
              
            return Response(status=status.HTTP_204_NO_CONTENT)
          
class TaskCommentsView(APIView):
    permission_classes=[IsAuthenticated]
    
    def get(self, request, workspace_id, project_id, task_id):
        _, _, task = get_task_context(
            request.user,
            workspace_id,
            project_id,
            task_id
        )
        
        comments = TaskComment.objects.filter(task=task).select_related("author").order_by("-created_at")
        
        serializer = TaskCommentSerializer(comments, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request, workspace_id, project_id, task_id):
        membership, _, task = get_task_context(
            request.user,
            workspace_id,
            project_id,
            task_id
        )
        
        serializer = TaskCommentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        comment = serializer.save(task=task, author=request.user)
        
        create_task_activity(
            workspace=membership.workspace,
            actor=request.user,
            task=task,
            action="task.comment_added",
            summery=f'Added a comment to "{task.title}"'
        )
        
        return Response(TaskCommentSerializer(comment).data, status=status.HTTP_201_CREATED)
    
class TaskCommentDetailView(APIView):
    permission_classes=[IsAuthenticated]
    
    def get_comment(self, task, comment_id):
        return get_object_or_404(
            TaskComment.objects.select_related("author"),
            id=comment_id,
            task=task
        )
        
    def patch(self, request, workspace_id, project_id, task_id, comment_id):
        
          membership, _, task = get_task_context(
              request.user,
              workspace_id,
              project_id,
              task_id
          )
          
          comment = self.get_comment(
              task,
              comment_id
          )
          
          # Only the author or manager can edit.
          if comment.author_id != request.user.id and membership.role != membership.Role.MANAGER:
              raise PermissionDenied("You cannot edit this comment.")
          
          serializer = TaskCommentSerializer(
              comment,
              data=request.data,
              partial=True
          )
          serializer.is_valid(raise_exception=True)
          
          comment = serializer.save()
          
          return Response(TaskCommentSerializer(comment).data, status=status.HTTP_200_OK)
      
    def delete(self, request, workspace_id, project_id, task_id, comment_id):
        membership, _, task = get_task_context(
            request.user,
            workspace_id,
            project_id,
            task_id,
        )
        
        comment = self.get_comment(
            task,
            comment_id
        )
        
        if comment.author_id != request.user.id and membership.role != membership.Role.MANAGER:
            raise PermissionDenied("You cannot delete this comment.")
        
        comment.delete()
        
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class TaskAttachmentsView(APIView):
    permission_classes=[IsAuthenticated]
    
    parser_classes = [MultiPartParser, FormParser]
    
    def get(self, request, workspace_id, project_id, task_id):
        _, _, task = get_task_context(
            request.user,
            workspace_id,
            project_id,
            task_id
        )
        
        attachments = TaskAttachment.objects.filter(task=task).select_related("uploaded_by")
        
        serializer = TaskAttachmentSerializer(attachments, many=True)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request, workspace_id, project_id, task_id):
        membership, _, task = get_task_context(
            request.user,
            workspace_id,
            project_id,
            task_id
        )
        
        serializer = TaskAttachmentUploadSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        uploaded_file = serializer.validated_data["file"]
        
        # Keep only the filename, not a user-supplied path.
        filename = uploaded_file.name.replace("\\", "/").split("/")[-1][:255]
        
        # Read actual binary contents
        file_data = uploaded_file.read()
        
        attachment = TaskAttachment.objects.create(
            task=task,
            uploaded_by=request.user,
            file=uploaded_file,
            original_filename=filename,
            content_type=uploaded_file.content_type or "",
            size_bytes=len(file_data)
        )
        
        create_task_activity(
            workspace=membership.workspace,
            actor=request.user,
            task=task,
            action="task.attachment_uploaded",
            summery=f'Uploaded "{filename}" to "{task.title}"'
        )
        
        return Response(TaskAttachmentSerializer(attachment).data, status=status.HTTP_201_CREATED)
    
class TaskAttachmentDetailView(APIView):
    permission_classes=[IsAuthenticated]
    
    def get_attachment(self, task, attachment_id):
        return get_object_or_404(
            TaskAttachment.objects.select_related("uploaded_by"),
            id=attachment_id,
            task=task
        )
        
    def delete(self, request, workspace_id,project_id, task_id, attachment_id):
        membership, _, task = get_task_context(
            request.user,
            workspace_id,
            project_id,
            task_id,
        )
        
        attachment = self.get_attachment(
            task,
            attachment_id
        )
        
        # Manager can delete any attachment.
        # Members can delete only their own uploads.
        if membership.role != membership.Role.MANAGER and attachment.uploaded_by_id != request.user.id:
            raise PermissionDenied("You cannot delete this attachment.")
        
        filename = attachment.original_filename
        
        # Delete the physical file before deleting its database record.
        attachment.delete()
        
        create_task_activity(
            workspace=membership.workspace,
            actor=request.user,
            task=task,
            action="task.attachment_deleted",
            summery=f'Removed "{filename}" from "{task.title}"'
        )
        
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class TaskAttachmentDownloadView(APIView):
    permission_classes=[IsAuthenticated]
    
    def get(self, request, workspace_id, project_id, task_id, attachment_id):
        
        _, _, task = get_task_context(
            request.user,
            workspace_id,
            project_id,
            task_id
        )
        
        attachment = get_object_or_404(
            TaskAttachment,
            id=attachment_id,
            task=task
        )
        
        if not attachment.file:
            raise ValidationError({"file": "Attachment file is unavailable."})
        
        return FileResponse(
            BytesIO(bytes(attachment.file_data)),
            as_attachment=True,
            filename=attachment.original_filename
        )