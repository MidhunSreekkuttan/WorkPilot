from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import SignupView, LoginView, GoogleLoginView

urlpatterns = [
    # Create account
    path("signup/", SignupView.as_view(), name="signup"),
    
    # Login
    path("token/", LoginView.as_view(), name="login"),
    
    # Google OAuth Login / Signup
    path("google/", GoogleLoginView.as_view(), name="google-login"),
    
    # Refresh access token
    path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh")
]