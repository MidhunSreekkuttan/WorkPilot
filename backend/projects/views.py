from django.db import transaction
from django.db.models import Count, Exists, OuterRef, Q
from django.shortcuts import get_object_or_404

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from activity.models import ActivityLog
from tasks.models import Task
from workspaces.permissions import get_workspace_membership, require_workspace_manager

from .models import Project, ProjectMembership
from .permissions import get_workspace_project
from .serializers import (
    AddProjectMemberSerializer,
    ProjectCreateSerializer,
    ProjectMemberSerializer,
    ProjectSerializer,
    ProjectUpdateSerializer
)

def get_annotated_projects_queryset(workspace, current_membership):
    
    is_member_subquery = ProjectMembership.objects.filter(
        project_id=OuterRef("pk"),
        membership=current_membership
    )
    
    return (
        Project.objects.filter(workspace=workspace).select_related("created_by").annotate(
            member_count=Count("memberships", distinct=Task),
            tasks_total=Count("tasks", distinct=Task),
            task_done=Count(
                "tasks",
                filter=Q(task__status=Task.Status.COMPLETED),
                distinct=Task
            ),
            is_member=Exists(is_member_subquery)
        ).order_by("-created_at")
    )
    
class ProjectListCreateView(APIView):
    permission_classes=[IsAuthenticated]
    
    def get(self, request, workspace_id):
        membership = get_workspace_membership(request.user, workspace_id)
        projects = get_annotated_projects_queryset(membership.workspace, membership)
        
        # Optional filters (?status=active&search=gateway&mine=true)
        status_filter = request.query_params.get("status", "").strip().lower()
        if status_filter and status_filter != "all":
            projects = projects.filter(status=status_filter)
            
            search_query = request.query_params.get("search", "").strip()
            if search_query:
                projects = projects.filter(
                    Q(name__icontains=search_query) or Q(description__icontains=search_query)
                )
                
            mine_only = request.query_params.get("mine","").strip().lower()
            if mine_only in ("true", "1"):
                projects = projects.filter(memberships__membership=membership)
                
            serializer = ProjectSerializer(projects, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
    def post(self, request, workspace_id):
        membership = get_workspace_membership(request.user, workspace_id)
        require_workspace_manager(membership)
        
        serializer = ProjectCreateSerializer(
            data=request.data,
            context={
                "request":request,
                "membership":membership
            }
        )
        
        serializer.is_valid(raise_exception=True)
        project = serializer.save()
        
        ActivityLog.objects.create(
            workspace=membership.workspace,
            actor=request.user,
            action="project.create",
            target_type="project",
            target_id=str(project.id),
            summary=f'Create project "{project.name}"',
            metadata={"status" : project.status},
        )
        
        annotated_project = get_annotated_projects_queryset(
            membership.workspace, membership
        ).get(id=project.id)
        
        return Response(
            ProjectSerializer(annotated_project).data,
            status=status.HTTP_201_CREATED
        )
        
class ProjectDetailView(APIView):
    permission_classes=[IsAuthenticated]
    
    def get(self, request, workspace_id, project_id):
        membership = get_workspace_membership(request.user, workspace_id)
        
        project = get_object_or_404(
            get_annotated_projects_queryset(membership.workspace, membership),
            id=project_id
        )
        
        data = ProjectSerializer(project).data
        memberships = (
            ProjectMembership.objects.filter(project=project).select_related("membership__user").order_by("joined_at")
        )
        data["members"] = ProjectMemberSerializer(memberships, many=True).data
        
        return Response(data, status=status.HTTP_200_OK)
    
    def patch(self, request, workspace_id, project_id):
        membership, project = get_workspace_project(
            request.user,
            workspace_id,
            project_id,
            require_manager=True
        )
        
        serializer = ProjectUpdateSerializer(
            project,
            data=request.data,
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        project = serializer.save()
        
        ActivityLog.objects.create(
            workspace=membership.workspace,
            actor=request.user,
            action="project.updated",
            target_type=str(project.id),
            summary=f'Updated project "{project.name}"',
            metadata={"status" : project.status}
        )
        
        annotated_project = get_annotated_projects_queryset(membership.workspace, membership).get(id=project.id)
        
        return Response(ProjectUpdateSerializer(annotated_project).data, status=status.HTTP_200_OK)
    
    def delete(self, request, workspace_id, project_id):
        membership, project = get_workspace_project(
            request.user,
            workspace_id,
            project_id,
            require_manager=True
        )
        
        project_name = project.name
        project_id_str = str(project.id)
        project.delete()
        
        ActivityLog.objects.create(
            workspace=membership.workspace,
            actor=request.user,
            action="project.delete",
            target_type="project",
            target_id=project_id_str,
            summary=f'Deleted project "{project_name}"'
        )
        
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class ProjectMembersView(APIView):
    permission_classes=[IsAuthenticated]
    
    def get(self, request, workspace_id, project_id):
        _, project = get_workspace_project(request.user, workspace_id, project_id)
        
        members = (
            ProjectMembership.objects.filter(project=project)
        )
        
        serializer = ProjectMemberSerializer(members, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @transaction.atomic
    def post(self, request, workspace_id, project_id):
        members, project = get_workspace_project(
            request.user,
            workspace_id,
            project_id,
            require_manager=True
        )
        
        serializer = AddProjectMemberSerializer(
            data=request.data,
            context={
                "workspace":members.workspace,
                "project":project
            }
        )
        serializer.is_valid(raise_exception=True)
        
        target_membership = serializer.context["target_membership"]
        
        project_member = ProjectMembership.objects.create(
            project=project,
            membership=target_membership,
            added_by=request.user
        )
        
        ActivityLog.objects.create(
            workspace=members.workspace,
            actor=request.user,
            action="project.member_added",
            target_type="project",
            target_id=str(project.id),
            summary=f'Added {target_membership.user.email} to "{project.name}"'
        )
        
        return Response(
            ProjectMemberSerializer(project_member).data,
            status=status.HTTP_201_CREATED
        )
        
class ProjectMemberDetailView(APIView):
    permission_classes=[IsAuthenticated]
    
    @transaction.atomic
    def delete(self, request, workspace_id, project_id, membership_id):
        membership, project = get_workspace_project(
            request.user,
            workspace_id,
            project_id,
            require_manager=True
        )
        
        project_member = get_object_or_404(
            ProjectMembership.objects.select_related("membership__user"),
            project=project,
            membership_id=membership_id
        )
        
        removed_email = project_member.membership.user.email
        
        # Unassign open tasks in this project belonging to the removed member.
        Task.objects.filter(
            project=project,
            assigned_to_id=membership_id,
        ).exclude(status=Task.Status.COMPLETED).update(assigned_to=None)
        
        project_member.delete()
        
        ActivityLog.objects.create(
            workspace=membership.workspace,
            actor=request.user,
            action="project.member_removed",
            target_type="project",
            target_id=str(project.id),
            summary=f'Removed {removed_email} from "{project.name}"',
            metadata={"membership_id": str(membership_id)},
        )
        
        return Response(status=status.HTTP_204_NO_CONTENT)