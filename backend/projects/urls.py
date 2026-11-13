from django.urls import path

from .views import (
    ProjectListCreateView,
    ProjectDetailView,
    ProjectMembersView,
    ProjectMemberDetailView,
)

urlpatterns = [
    # /api/workspaces/<workspace_id>/projects/
    path("", ProjectListCreateView.as_view(), name="project-list-create"),
    
    # /api/workspaces/<workspace_id>/projects/<project_id>/
    path("<uuid:project_id>/", ProjectDetailView.as_view(), name="project-detail"),
    
    # /api/workspaces/<workspace_id>/projects/<project_id>/members/
    path("<uuid:project_id>/members", ProjectMembersView.as_view(), name="project-members"),
    
    # /api/workspaces/<workspace_id>/projects/<project_id>/members/<membership_id>/
    path("<uuid:project_id>/members/<uuid:membership_id>/", ProjectMemberDetailView.as_view(), name="project-member-detail")
]
