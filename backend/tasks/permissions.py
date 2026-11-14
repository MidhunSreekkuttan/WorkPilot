from django.shortcuts import get_object_or_404

from rest_framework.exceptions import PermissionDenied

from projects.models import ProjectMembership
from projects.permissions import get_workspace_project

from .models import Task

def get_project_context(user, workspace_id, project_id):
    
    membership, project = get_workspace_project(
        user,
        workspace_id,
        project_id
    )
    
    if membership.role != membership.Role.MANAGER:
        is_project_member = ProjectMembership.objects.filter(
            project=project,
            membership=membership
        ).exists()
        
        if not is_project_member:
            raise PermissionDenied("You must be a project member to access these tasks.")
        
    return membership, project

def get_task_context(user, workspace_id, project_id, task_id):
    
    membership, project = get_project_context(
        user,
        workspace_id,
        project_id
    )
    
    task = get_object_or_404(
        Task.objects.select_related(
            "project",
            "assigned_to__user",
            "created_by"
        ),
        id=task_id,
        project=project
    )
    
    return membership, project, task

def require_manager(membership, task):
    if membership.role != membership.Role.MANAGER:
        raise PermissionDenied("Only workspace managers can perform this action.")

def require_assigned_member(membership, task):
    
    if membership.role == membership.Role.MANAGER:
        return
    
    if task.assigned_to_id != membership.id:
        raise PermissionDenied("You can only update tasks assigned to you.")