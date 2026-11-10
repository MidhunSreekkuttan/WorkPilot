from django.shortcuts import get_list_or_404
from rest_framework.exceptions import PermissionDenied
from .models import WorkspaceMembership

def get_workspace_membership(user, workspace_id):
    
    return get_list_or_404(
        WorkspaceMembership.objects.select_related(
            "workspace",
            "user"
        ),
        workspace_id=workspace_id,
        user=user,
        status=WorkspaceMembership.Status.ACTIVE
    )

def require_workspace_manager(membership):
    
    if membership.role != WorkspaceMembership.Role.MANAGER:
        raise PermissionDenied("Only workspace managers can perform this action.")
    
    return membership