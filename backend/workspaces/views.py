from django.db.models import (Count, OuterRef, Subquery, Q)
from django.db import transaction

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import ValidationError, PermissionDenied

from .models import Workspace, WorkspaceMembership, WorkspaceInvitation

from .serializers import (
    WorkspaceSerializer,
    WorkspaceCreateSerializer,
    WorkspaceListSerializer, 
    WorkspaceUpdateSerializer,
    WorkspaceMemberSerializer,
    AcceptInvitationSerializer
)

from .permissions import get_workspace_membership, require_workspace_manager

import hashlib
import secrets

from datetime import timedelta

from django.conf import settings
from django.utils import timezone

# Create your views here.

class WorkspaceListCreateView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        
        user = request.user
        
        current_membership = WorkspaceMembership.objects.filter(
            workspace_id=OuterRef("pk"),
            user=user,
            status=WorkspaceMembership.Status.ACTIVE
        ).values("role")[:1]
        
        workspaces = Workspace.objects.filter(
            memberships__user=user,
            memberships__status=WorkspaceMembership.Status.ACTIVE
        ).annotate(
            current_role=Subquery(current_membership),
            member_count=Count("memberships",filter=Q(memberships__status=WorkspaceMembership.Status.ACTIVE),distinct=True),
            project_count=Count("projects",distinct=True)
        ).distinct().order_by("-created_at")
        
        
        serializer = WorkspaceListSerializer(workspaces, many=True)
        
        return Response(serializer.data)
    
    def post(self, request):
        
        serializer = WorkspaceCreateSerializer(data=request.data, context={"request":request})
       
        serializer.is_valid(raise_exception=True)
        
        workspace = serializer.save()
        
        response_data = WorkspaceSerializer(workspace).data
        
        response_data["role"] = WorkspaceMembership.Role.MANAGER
        
        return Response(
            response_data,
            status=status.HTTP_201_CREATED
        )
        
class WorkspaceDetailView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, workspace_id):
        
        membership = get_workspace_membership(request.user, workspace_id)
        
        workspace = membership.workspace

        serializer = WorkspaceSerializer(workspace)
        
        data = serializer.data
        data["role"] = membership.role
        
        return Response(data)
    
    def patch(self, request, workspace_id):
        
        membership = get_workspace_membership(request.user, workspace_id)
        
        require_workspace_manager(membership)
        
        workspace = membership.workspace
        
        serializer = WorkspaceUpdateSerializer(
            workspace,
            data=request.data,
            partial=True
        )
        
        serializer.is_valid(raise_exception=True)
        
        workspace = serializer.save()
        
        return Response(WorkspaceSerializer(workspace).data)
    
class WorkspaceMembersView(APIView):
    permission_classes=[IsAuthenticated]
    
    def get(self, request, workspace_id):
        
        membership = get_workspace_membership(request.user, workspace_id)
        
        members = WorkspaceMembership.objects.filter(
            workspace=membership.workspace,
            status=WorkspaceMembership.Status.ACTIVE
        ).select_related("user")
        
        serializer = WorkspaceMemberSerializer(members, many=True)
        
        return Response(serializer.data)
    
class WorkspaceInvitationCreateView(APIView):
    permission_classes=[IsAuthenticated]
    
    def post(self, request, workspace_id):
        
        membership = get_workspace_membership(request.user, workspace_id)
        
        require_workspace_manager(membership)
        
        email = request.data.get("email", "").strip().lower()
        
        if not email:
            raise ValidationError({"email":"Email address is required."})
        
        # Avoid inviting an existing active member.
        already_member = WorkspaceMembership.objects.filter(
            workspace=membership.workspace,
            user__email__iexact=email,
            status=WorkspaceMembership.Status.ACTIVE
        ).exists()
        
        if already_member:
            raise ValidationError("This user is already a workspace member.")
        
        # Generate a random invitation token.
        raw_token = secrets.token_urlsafe(32)
        
        token_hash = hashlib.sha256(raw_token.encode("utf-8")).hexdigest()
        
        # Invalidate older pending invitations to this email.
        WorkspaceInvitation.objects.filter(
            workspace=membership.workspace,
            email__iexact=email,
            status=WorkspaceInvitation.Status.PENDING
        ).update(status=WorkspaceInvitation.Status.REVOKED)
        
        invitation = WorkspaceInvitation.objects.create(
            workspace=membership.workspace,
            email=email,
            invited_by=request.user,
            token_hash=token_hash,
            expires_at=timezone.now() + timedelta(days=7),
            role=WorkspaceMembership.Role.MEMBER
        )
        
        data = {
            "id":invitation.id,
            "email":invitation.email,
            "status":invitation.status,
            "expires_at":invitation.expires_at
        }
        
        # Temporary development support.
        # In production, send this token through email instead.
        if settings.DEBUG:
            data["token"] = raw_token
            
        return Response(data,status=status.HTTP_201_CREATED)
    
class AcceptWorkspaceInvitationView(APIView):
    permission_classes=[IsAuthenticated]
    
    @transaction.atomic
    def post(self, request):
        
        serializer = AcceptInvitationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        token = serializer.validated_data(["token"])
        
        token_hash = hashlib.sha256(token.encode("utf-8")).hexdigest()
        
        invitation = (WorkspaceInvitation.objects.select_for_update().filter(
            token_hash=token_hash,
            status=WorkspaceInvitation.Status.PENDING
        ).first())
        
        if not invitation or invitation.expires_at <= timezone.now():
            raise ValidationError("This invitation is invalid or has expired.")
        
        # Invitation must belong to the authenticated user's email.
        if invitation.email.casefold() != request.user.email.casefold():
            raise PermissionDenied("This invitation belongs to another email address.")
        
        membership, created = WorkspaceMembership.objects.get_or_create(
            workspace=invitation.workspace,
            user=request.user,
            defaults={
                "role":WorkspaceMembership.Role.MEMBER,
                "status":WorkspaceMembership.Status.ACTIVE
            }
        )
        
        if not created:
            
            if membership.status == WorkspaceMembership.Status.LEFT:
                
                membership.status = WorkspaceMembership.Status.ACTIVE
                membership.role = WorkspaceMembership.Role.MEMBER
                membership.joined_at = timezone.now()
                
                membership.save(update_fields=[
                        "status",
                        "role",
                        "joined_at",
                ])
                
            elif membership.status == WorkspaceMembership.Status.SUSPENDED:
                
                raise PermissionDenied("Your membership in this workspace is suspended.")
            
            else:
                raise ValidationError("You are already a member of this workspace.")
            
            invitation.status = WorkspaceInvitation.Status.ACCEPTED
            invitation.accepted_at = timezone.now()
            
            invitation.save(update_fields=["status", "accepted_at"])
            
            return Response(
                {
                "message": "You successfully joined the workspace.",
                "workspace":WorkspaceSerializer(invitation.workspace).data,
                "role":membership.role
                },
                status=status.HTTP_200_OK
            )