from django.conf import settings

from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .serializers import (
    SignupSerializer,
    UserSerializer,
    LoginSerializer,
    GoogleAuthSerializer,
    AuthUserSerializer
)

# cookie helper
def set_auth_cookies(response, access_token, refresh_token):
    response.set_cookie(
        key='access_token',
        value=access_token,
        httponly=True,
        secure=settings.DEBUG is False,
        samesite='Lax',
        max_age=3600
    )
    response.set_cookie(
        key='refresh_token',
        value=refresh_token,
        httponly=True,
        secure=settings.DEBUG is False,
        samesite='Lax',
        max_age=86400 * 7
    )
    
    return response

class CookieTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        refresh_token = request.COOKIES.get("refresh_token")
        if not refresh_token:
            return Response(
                {"detail": "Refresh token cookie not found."},
                status=status.HTTP_401_UNAUTHORIZED
            )
            
        serializer = self.get_serializer(data={"refresh": refresh_token})
        serializer.is_valid(raise_exception=True)
        
        access_token = serializer.validated_data["access"]

        new_refresh_token = serializer.validated_data.get(
            "refresh",
            refresh_token
        )
        
        response = Response(
            {"message": "Token refreshed successfully."},
            status=status.HTTP_200_OK
        )
        
        return set_auth_cookies(
            response,
            access_token,
            new_refresh_token
        )

    
class SignupView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        
        serializer = SignupSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Create user.
        user = serializer.save()
        
        return Response(
            {
                "message": "Account created successfully.",
                "user": UserSerializer(user).data
            },
            status=status.HTTP_201_CREATED
        )
        
class LoginView(TokenObtainPairView):
    
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]
    
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        if response.status_code == 200:
            access = response.data.get('access')
            refresh = response.data.get('refresh')
            response = set_auth_cookies(response, access, refresh)
            
            response.data.pop("access", None)
            response.data.pop("refresh", None)
            
            response.data["message"] = "Login Successfull"
            
        return response
    
class GoogleLoginView(APIView):
    permission_classes=[AllowAny]
    
    def post(self, request):
        serializer = GoogleAuthSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        user = serializer.validated_data["user"]
        created = serializer.validated_data["created"]
        
        refresh = RefreshToken.for_user(user)
        
        response = Response(
            {
               "message": "Google authentication successful.",
               "user": UserSerializer(user).data,
               "is_new_user": created
            },
            status=status.HTTP_201_CREATED if created else status.HTTP_200_OK
        )
        
        return set_auth_cookies(response, str(refresh.access_token), str(refresh))
        
class AuthUser(APIView):
    permission_classes=[IsAuthenticated]
    
    def get(self, request):
        
        serializer = AuthUserSerializer(request.user)
        
        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

@api_view(["POST"])
def Logout(request):
    response = Response(
        {"message": "Logout successful"},
        status=status.HTTP_200_OK
    )
    
    response.delete_cookie(
        "access_token",
        path="/",
        samesite="Lax"
    )
    
    response.delete_cookie(
        "refresh_token",
        path="/",
        samesite="Lax"
    )
    
    return response