from django.urls import path

from .views import (
    WorkspaceListCreateView,
    WorkspaceDetailView,
    WorkspaceMembersView,
    WorkspaceInvitationCreateView,
)

urlpatterns = [
    # Workspace collection
    path("", WorkspaceListCreateView.as_view(),name="workspace-list-create"),
    
    # Workspace details
    path("<uuid:workspace_id>/", WorkspaceDetailView.as_view(), name="workspace-detail"),
    
    # Workspace members
    path("<uuid:workspace_id>/members/", WorkspaceMembersView.as_view(), name="workspace-members"),
    
    # Create invitation
    path("<uuid:workspace_id>/invitations/", WorkspaceInvitationCreateView.as_view(), name="workspace-invitation-create")
]
