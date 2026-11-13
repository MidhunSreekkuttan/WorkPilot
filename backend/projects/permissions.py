from django.shortcuts import get_object_or_404
from rest_framework.exceptions import PermissionDenied

from workspaces.permissions import get_workspace_membership, require_workspace_manager
from .models import Project, ProjectMembership

def get_workspace_project(user, workspace_id, project_id, require_manager=False):
    
    membership = get_workspace_membership(user, workspace_id)
    
    if require_manager:
        require_workspace_manager(membership)
        
    project = get_object_or_404(
        Project.objects.select_related("workspace", "created_by"),
        id=project_id,
        workspace=membership.workspace
    )
    
    return membership, project

def require_project_member_or_manager(membership, project):
    
    if membership.role == membership.Role.MANAGER:
        return True
    
    is_member = ProjectMembership.objects.filter(
        project=project,
        membership=membership
    )
    
    if not is_member:
        raise PermissionDenied("You must be assigned to this project to perform this action.")
    
    return True