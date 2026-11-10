from django.contrib import admin
from django.urls import path, include

from workspaces.views import AcceptWorkspaceInvitationView

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Authentication
    path("api/auth/", include("accounts.urls")),
    
    # Workspaces
    path("api/workspaces/", include("workspaces.urls")),
    
    # Accept invitation
    path("api/workspace-invitations/accept/", AcceptWorkspaceInvitationView.as_view(), name="workspace-invitation-accept")
]
