from django.urls import path

from .views import (
    TaskListCreateView,
    TaskDetailView,
    TaskCommentsView,
    TaskCommentDetailView,
    TaskAttachmentsView,
    TaskAttachmentDetailView,
    TaskAttachmentDownloadView,
)

urlpatterns = [
    # List and create tasks
    path("", TaskListCreateView.as_view(), name="task-list-create"),
    
    # Task details, updates and deletion
    path("<uuid:task_id>/", TaskDetailView.as_view(), name="task-detail"),
    
    # Task comments
    path("<uuid:task_id>/comments/", TaskCommentsView.as_view(), name="task-comments"),
    
    # Individual comment
    path("<uuid:task_id>/comments/<int:comment_id>/", TaskCommentDetailView.as_view(), name="task-comment-detail"),
    
    # Task attachments
    path("<uuid:task_id>/attachments/", TaskAttachmentsView.as_view(), name="task-attachments"),
    
    # Individual attachment
    path("<uuid:task_id>/attachments/<uuid:attachment_id>/", TaskAttachmentDetailView.as_view(), name="task-attachment-detail"),
    
    # Download attachment
    path("<uuid:task_id>/attachments/<uuid:attachment_id>/download/", TaskAttachmentDownloadView.as_view(), name="task-attachment-download")
]