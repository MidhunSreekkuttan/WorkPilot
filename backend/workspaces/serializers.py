from uuid import uuid4

from django.db import transaction
from django.utils.text import slugify

from rest_framework import serializers
from .models import Workspace, WorkspaceMembership

class WorkspaceSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Workspace
        fields = [
            "id",
            "name",
            "slug",
            "description",
            "avatar_color",
            "estimated_team_size",
            "created_by",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "slug",
            "created_by",
            "created_at",
            "updated_at",
        ]
        
class WorkspaceCreateSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Workspace
        
        fields = [
            "name",
            "description",
            "avatar_color",
            "estimated_team_size",
        ]
        
    def validate_name(self, value):
        value = value.strip()
        
        if not value:
            raise serializers.ValidationError("Workspace name cannot be empty.")
        return value
    
    @transaction.atomic
    def create(self, validated_data):
        
        user = self.context["request"].user
        
        base_slug = slugify(validated_data["name"]) or "Workspace"
        
        # Generate a unique workspace slug.
        slug = f"{base_slug[:110]}--{uuid4().hex[:8]}"
        
        workspace = Workspace.objects.create(
            **validated_data,
            slug=slug,
            created_by=user
        )
        
        # Creator automatically becomes manager.
        WorkspaceMembership.objects.create(
            workspace=workspace,
            user=user,
            role=WorkspaceMembership.role.MANAGER
        )
        
        return workspace
    
class WorkspaceUpdateSerializer(serializers.ModelSerializer):
        model = Workspace
        
        fields = [
            "name",
            "description",
            "avatar_color",
            "estimated_team_size",
        ]
        
class WorkspaceListSerializer(serializers.ModelSerializer):
    
    role = serializers.CharField(
        source="current_role",
        read_only=True
    )
    
    member_count = serializers.IntegerField(read_only=True)
    project_count = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = Workspace
        
        fields = [
            "id",
            "name",
            "slug",
            "description",
            "avatar_color",
            "role",
            "member_count",
            "project_count",
            "created_at",
        ]
        
class WorkspaceMemberSerializer(serializers.ModelSerializer):
    
    user_id = serializers.ReadOnlyField(source="user.id")
    email = serializers.EmailField(source="user.email", read_only=True)
    first_name = serializers.CharField(source="user.first_name", read_only=True)
    last_name = serializers.CharField(source="user.last_name", read_only=True)
    avatar_url = serializers.CharField(source="user.avatar_url", read_only=True)
    job_title = serializers.CharField(source="user.job_title", read_only=True)
    
    class Meta:
        model = WorkspaceMembership
        
        fields = [
            "id",
            "user_id",
            "email",
            "first_name",
            "last_name",
            "avatar_url",
            "job_title",
            "role",
            "joined_at",
        ]
        
class AcceptInvitationSerializer(serializers.ModelSerializer):
    
    token = serializers.CharField(max_length=128, trim_whitespace=True)
    