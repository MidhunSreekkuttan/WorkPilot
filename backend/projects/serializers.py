from django.db import transaction
from rest_framework import serializers

from workspaces.models import WorkspaceMembership
from .models import Project, ProjectMembership

class ProjectMemberSerializer(serializers.ModelSerializer):
    membership_id = serializers.ReadOnlyField(source="membership.id")
    user_id = serializers.ReadOnlyField(source="membership.user.id")
    email = serializers.EmailField(source="membership.user.email", read_only=True)
    first_name = serializers.CharField(source="membership.user.first_name", read_only=True)
    last_name = serializers.CharField(source="membership.user.last_name", read_only=True)
    full_name = serializers.SerializerMethodField()
    avatar_url = serializers.CharField(source="membership.user.avatar_url", read_only=True)
    job_title = serializers.CharField(source="membership.user.job_title", read_only=True)
    workspace_role = serializers.CharField(source="membership.role", read_only=True)
    
    class Meta:
        model = ProjectMembership
        fields = [
            "id",
            "membership_id",
            "user_id",
            "email",
            "first_name",
            "last_name",
            "full_name",
            "avatar_url",
            "job_title",
            "workspace_role",
            "added_by",
            "joined_at",
        ]
        read_only_fields = fields
        
    def get_full_name(self, obj):
        user = obj.membership.user
        return user.get_full_name() or user.email.split("@")[0]
    
class ProjectSerializer(serializers.ModelSerializer):
    created_by_name = serializers.SerializerMethodField()
    member_count = serializers.IntegerField(read_only=True, default=0)
    tasks_total = serializers.IntegerField(read_only=True, default=0)
    tasks_done = serializers.IntegerField(read_only=True, default=0)
    my_tasks_count = serializers.IntegerField(read_only=True, default=0)
    progress = serializers.SerializerMethodField()
    is_member = serializers.BooleanField(read_only=True, default=False)
    
    class Meta:
        model = Project
        fields = [
            "id",
            "workspace",
            "name",
            "description",
            "status",
            "start_date",
            "due_date",
            "created_by",
            "created_by_name",
            "member_count",
            "tasks_total",
            "tasks_done",
            "my_tasks_count",
            "progress",
            "is_member",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "workspace",
            "created_by",
            "created_at",
            "updated_at",
        ]
        
    def get_created_by_name(self, obj):
        return obj.created_by.get_full_name() or obj.created_by.email.split("@")[0]
    
    def get_progress(self, obj):
        total = getattr(obj, "tasks_total", 0) or 0
        done = getattr(obj, "tasks_done", 0) or 0
        
        if total == 0:
            return 0
        return round((done / total) * 100)
    
class ProjectCreateSerializer(serializers.ModelSerializer):
    member_ids = serializers.ListField(
        child=serializers.UUIDField(),
        required=False,
        allow_empty=True,
        write_only=True,
        help_text="Optional list of WorkspaceMembership UUIDs to assign on creation."
    )
    
    class Meta:
        model = Project
        fields = [
            "name",
            "description",
            "status",
            "start_date",
            "due_date",
            "member_ids",
        ]
        
    def validate_name(self, value):
        value = value.strip()
        
        if not value:
            raise serializers.ValidationError("Project name cannot be empty.")
        return value
    
    def validate(self, attrs):
        start_date = attrs.get("start_date")
        due_date = attrs.get("due_date")
        
        if start_date and due_date and start_date < due_date:
            raise serializers.ValidationError({
                "due_date" : "Due date cannot be earlier than start date."
            })
            
        return attrs
    
    @transaction.atomic
    def create(self, validated_data):
        member_ids = validated_data.pop("member_ids", [])
        request = self.context["request"]
        creator_membership = self.context["membership"]
        workspace = creator_membership.workspace
        
        project = Project.objects.create(
            workspace=workspace,
            created_by=request.user,
            **validated_data
        )
        
        # Always add the creator to the project squad.
        memberships_to_add = {creator_membership.id}
        if member_ids:
            valid_ids = WorkspaceMembership.objects.filter(
                workspace=workspace,
                id=member_ids,
                status=WorkspaceMembership.Status.ACTIVE
            ).values_list("id", flat=True)
            memberships_to_add.update(valid_ids)
            
        ProjectMembership.objects.bulk_create([
            ProjectMembership(
                project=project,
                membership_id=m_id,
                added_by=request.user
            )
            for m_id in memberships_to_add
        ])
        
        return project
    
class ProjectUpdateSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Project
        fields = [
            "name",
            "description",
            "status",
            "start_date",
            "due_date",
        ]
        
    def validate_name(self, value):
        value = value.strip()
        if not value:
            raise serializers.ValidationError("Project name cannot be empty.")
        return value
    
    def validate(self, attrs):
        start_date = attrs.get(
            "start_date",
            self.instance.start_date if self.instance else None
        )
        due_date = attrs.get(
            "due_date",
            self.instance.due_date if self.instance else None
        )
        
        if start_date and due_date and due_date < start_date:
            raise serializers.ValidationError({
                "due_date": "Due date cannot be earlier than start date."
            })
            
        return attrs
    
class AddProjectMemberSerializer(serializers.Serializer):
    membership_id = serializers.UUIDField()
        
    def validate_membership_id(self, value):
        workspace = self.context["workspace"]
        project = self.context["project"]
            
        try:
            target_membership = WorkspaceMembership.objects.select_related("user").get(
                id=value,
                workspace=workspace,
                status=WorkspaceMembership.Status.ACTIVE
            )
        except WorkspaceMembership.DoesNotExist:
            raise serializers.ValidationError("Active workspace member not found in this workspace.")
            
        if ProjectMembership.objects.filter(project=project, membership=target_membership).exists():
            raise serializers.ValidationError("This member is already assigned to the project.")
            
        self.context["target_membership"] = target_membership
        return value