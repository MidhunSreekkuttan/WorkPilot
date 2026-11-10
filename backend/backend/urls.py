from django.contrib import admin
from django.urls import path, include

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from workspaces.views import AcceptWorkspaceInvitationView

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # Authentication
    path("api/auth/token/" ,TokenObtainPairView.as_view(), name="token-obtain-pair"),
    
    path("api/auth/token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    
    # Workspaces
    path("api/workspaces/", include("workspaces.urls")),
    
    # Accept invitation
    path("api/workspace-invitations/accept/", AcceptWorkspaceInvitationView.as_view(), name="workspace-invitation-accept")
]
