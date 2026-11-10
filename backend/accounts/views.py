from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView

from .serializers import (
    SignupSerializer,
    UserSerializer,
    LoginSerializer
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