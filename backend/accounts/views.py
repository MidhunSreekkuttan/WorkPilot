from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import (
    SignupSerializer,
    UserSerializer,
    LoginSerializer,
    GoogleAuthSerializer
)

# Create your views here.
class SignupView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        
        serializer = SignupSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Create user.
        user = serializer.save()
        
        # Generate JWT tokens.
        refresh = RefreshToken.for_user(user)
        
        return Response(
            {
                "message": "Account created successfully.",
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "user": UserSerializer(user).data
            },
            status=status.HTTP_201_CREATED
        )
        
class LoginView(TokenObtainPairView):
    
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]
    
class GoogleLoginView(APIView):
    permission_classes=[AllowAny]
    
    def post(self, request):
        serializer = GoogleAuthSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        user = serializer.validated_data["user"]
        created = serializer.validated_data["created"]
        
        refresh = RefreshToken.for_user(user)
        
        return Response(
            {
               "message": "Google authentication successful.",
               "access": str(refresh.access_token),
               "refresh": str(refresh),
               "user": UserSerializer(user).data,
               "is_new_user": created
            },
            status=status.HTTP_201_CREATED if created else status.HTTP_200_OK
        )