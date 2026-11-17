from django.urls import path

from .views import SignupView, LoginView, GoogleLoginView, AuthUser, CookieTokenRefreshView, Logout

urlpatterns = [
    # Create account
    path("signup/", SignupView.as_view(), name="signup"),
    
    # Login
    path("token/", LoginView.as_view(), name="login"),
    
    # Google OAuth Login / Signup
    path("google/", GoogleLoginView.as_view(), name="google-login"),
    
    # Refresh access token
    path("token/refresh/", CookieTokenRefreshView.as_view(), name="token-refresh"),
    
    # Auth user
    path("authUser/", AuthUser.as_view(), name="auth-user"),
    
    path("logout/", Logout, name="logout")
]