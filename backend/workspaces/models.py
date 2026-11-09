import uuid

from django.conf import settings
from django.db import models

# Create your models here.

class Workspace(models.Model):
    
    class TeamSize(models.TextChoices):
        SOLO = "solo", "just me"
        SMALL = "small", "2 - 10"
        MEDIUM = "medium", "11 - 50"
        LARGE = "large", "50+"
        
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
        )
        
    name = models.CharField(max_length=120)
        
    slug = models.SlugField(max_length=140, unique=True)
        
    description = models.TextField(blank=True)
        
    avatar_color = models.CharField(max_length=7, default='#ff6a00')
        
    estimated_team_size = models.CharField(
        max_length=20,
        choices=TeamSize.choices,
        default=TeamSize.SOLO
        )
        
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="created_workspaces"
        )
    
    users = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        through="WorkspaceMembership",
        related_name="Workspace"
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ["-created_at"]
        indexes = [models.Index(fields=['name'])]
        
    def __str__(self):
        return self.name
    
class WorkspaceMembership(models.Model):
    
    class Role(models.TextChoices):
        MANAGER = "manager", "Manager"
        MEMBER = "member", "Member"
        
    class Status(models.TextChoices):
        ACTIVE = "active", "Active"
        SUSPENDED = "suspended", "Suspended"
        LEFT = "left", "Left"
        
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    
    workspace = models.ForeignKey(
        Workspace,
        on_delete=models.CASCADE,
        related_name="memberships"
    )
    
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="workspace_memberships"
    )
    
    role = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.MEMBER
    )
    
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.ACTIVE
    )
    
    joined_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["workspace", "user"],
                name="unique_workspace_member"
            )
        ]
        
        ordering = ["-joined_at"]
        
    def __str__(self):
        return f"{self.user.email} - {self.workspace.name} ({self.role})"
    
class WorkspaceInvitation(models.Model):
    class Status(models.TextChoices):
        PENDING = "pending", "Pending"
        ACCEPTED = "accepted", "Accepted"
        REVOKED = "revoked", "Revoked"
        
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    
    workspace = models.ForeignKey(
        Workspace,
        on_delete=models.CASCADE,
        related_name="invitations"
    )
    
    email = models.EmailField()
    
    role = models.CharField(
        max_length=20,
        choices=WorkspaceMembership.Role.choices,
        default=WorkspaceMembership.Role.MEMBER
    )
    
    token_hash = models.CharField(max_length=64, unique=True)
    
    invited_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="sent_workspace_invitations"
    )
    
    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.PENDING
    )
    
    expires_at = models.DateTimeField()
    accepted_at = models.DateTimeField(null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ["-created_at"]
        
    def __str__(self):
        return f"{self.email} - {self.workspace.name}"