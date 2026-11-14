from rest_framework import serializers

from django.utils import timezone

from workspaces.models import WorkspaceMembership
from .models import Task, TaskComment, TaskAttachment

class TaskSerializer(serializers.ModelSerializer):
    
    assigned_to = serializers.SerializerMethodField()
    created_by_name = serializers.SerializerMethodField()
    attachments_count = serializers.IntegerField(read_only=True, default=0)
    comments_count = serializers.IntegerField(read_only=True, default=0)
    
    class Meta:
        model = Task
        fields = [
            "id",
            "project",
            "title",
            "description",
            "assigned_to",
            "created_by",
            "created_by_name",
            "status",
            "priority",
            "due_date",
            "completed_at",
            "attachments_count",
            "comments_count",
            "created_at",
            "updated_at",
        ]
        read_only_fields=fields
        
    def get_assigned_to(self, obj):
        
        membership = obj.assigned_to
        if not membership:
            return None
        
        user = membership.user
        
        return {
            "membership_id":str(membership.id),
            "user_id":str(user.id),
            "full_name":user.get_full_name() or user.email.split("@")[0],
            "email":user.email,
            "avatar_url":user.avatar_url,
            "job_title": user.job_title,
            "workspace_role": membership.role,
        }
        
    def get_created_by_name(self, obj):
        
        return obj.created_by.get_full_name() or obj.created_by.email.split("@")[0]
    
class TaskWriteSerializer(serializers.ModelSerializer):
    
    
    assigned_to_id = serializers.UUIDField(
        required=False,
        allow_null=True,
        write_only=True
    )
    
    class Meta:
        model = Task
        
        fields = [
            "title",
            "description",
            "assigned_to_id",
            "status",
            "priority",
            "due_date",
        ]
        
    def validate_title(self, value):
        
        value = value.strip()
        
        if not value:
            raise serializers.ValidationError("Task title cannot be empty.")
        
        return value
    
    def validate_assigned_to_id(self, value):
        
        if value is None:
            return None
        
        project = self.context["project"]
        
        try:
            membership = WorkspaceMembership.objects.get(
                id=value,
                workspace=project.workspace,
                status=WorkspaceMembership.Status.ACTIVE,
                project_assignments__project=project
            )
        except WorkspaceMembership.DoesNotExist:
            raise serializers.ValidationError("Assignee must be an active member of this project.")
        
        return membership
    
    def create(self, validated_data):
        
        assigned_to = validated_data.pop("assigned_to_id", None)
        
        request = self.context("request")
        project = self.context["project"]
        
        status_value = validated_data.get("status", Task.Status.TODO)
        
        completed_at = (
            timezone.now()
            if status_value == Task.Status.COMPLETED
            else None
        )
        
        return Task.objects.create(
            project=project,
            created_by=request.user,
            assigned_to=assigned_to,
            completed_at=completed_at,
            **validated_data
        )
        
    def update(self, instance, validated_data):
        
        if "assigned_to_id" in validated_data:
            instance.assigned_to = validated_data.pop(
                "assigned_to_id"
            )
            
        for field, value in validated_data.items():
            setattr(instance, field, value)
            
        if instance.status == Task.Status.COMPLETED:
            if not instance.completed_at:
                instance.completed_at = timezone.now()
            else:
                instance.completed_at = None
                
        instance.save()
        return instance
    
class TaskStatusUpdateSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Task
        fields = ["status"]
        
class TaskCommentSerializer(serializers.ModelSerializer):
    
    author_name = serializers.SerializerMethodField()
    
    author_email = serializers.EmailField(source="author.email", read_only=True)
    
    class Meta:
        model = TaskComment
        fields = [
            "id",
            "author",
            "author_name",
            "author_email",
            "content",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "author",
            "author_name",
            "author_email",
            "created_at",
            "updated_at",
        ]
    
    def get_author_name(self, obj):
        return (obj.author.get_full_name() or obj.author.email.split("@")[0])
    
    def validate_content(self, value):
        
        value = value.strip()
        if not value:
            raise serializers.ValidationError("Comment cannot be empty.")
        
        return value
    
class TaskAttachmentSerializer(serializers.ModelSerializer):
    
    uploaded_by_name = serializers.SerializerMethodField()
    
    class Meta:
        model = TaskAttachment
        fields = [
            "id",
            "original_filename",
            "content_type",
            "size_bytes",
            "uploaded_by",
            "uploaded_by_name",
            "uploaded_at",
        ]
        read_only_fields = fields
        
    def get_uploaded_by_name(self, obj):
        return obj.uploaded_by.get_full_name() or obj.uploaded_by.email.split("@")[0]
    
class TaskAttachmentUploadSerializer(serializers.Serializer):
    
    file = serializers.FileField()
    
    MAX_FILE_SIZE = 25 * 1024 * 1024
    
    def validate(self, value):
        
        if value.size > self.MAX_FILE_SIZE:
            raise serializers.ValidationError("File size cannot exceed 25 MB.")
        
        return value