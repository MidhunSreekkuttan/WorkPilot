from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import SignupView, LoginView

urlpatterns = [
    # Create account
    path("signup/", SignupView.as_view(), name="signup"),
    
    # Login
    path("token/", LoginView.as_view(), name="login"),
    
    # Refresh access token
    path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh")
]