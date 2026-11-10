from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError as DjangoValidationError

from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    
    full_name = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        
        fields = [
            "id",
            "full_name",
            "first_name",
            "last_name",
            "email",
            "job_title",
            "avatar_url",
            "date_joined",
        ]
        
        read_only_fields = fields
        
    def get_full_name(self, obj):
        return obj.get_full_name() or obj.email.split("@")[0]
        
class SignupSerializer(serializers.Serializer):
    
    full_name = serializers.CharField(max_length=301)
    email = serializers.EmailField()
    password = serializers.CharField(
        write_only=True,
        trim_whitespace=False,
        max_length=128
    )
    
    job_title = serializers.CharField(
        max_length=200,
        required=False,
        allow_blank=True
    )
    
    def validate_email(self, value):
        
        email = value.strip().lower()
        
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError("An account with this email already exists.")
        
        return email
    
    def validate(self, attrs):
        
        # Split full name into first and last name.
        name_parts = attrs["full_name"].strip().split(maxsplit=1)
        
        if not name_parts:
            raise serializers.ValidationError({"full_name": "Full name is required."})
        
        first_name = name_parts[0]
        last_name = name_parts[1] if len(name_parts) > 1 else ""
        
        if len(first_name) > 150 or len(last_name) > 150:
            raise serializers.ValidationError({"full_name": "Name is too long."})
        
        # Validate password using Django's configured validators.
        candidate_user = User(
            email=attrs["email"],
            first_name=first_name,
            last_name=last_name
        )
        
        try:
            validate_password(attrs["password"], user=candidate_user)
            
        except DjangoValidationError as error:
            raise serializers.ValidationError({
                "password": list(error.messages)
            })
            
        attrs["first_name"] = first_name
        attrs["last_name"] = last_name
        
        attrs.pop("full_name")
        
        return attrs
    
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
    
class LoginSerializer(TokenObtainPairSerializer):
    
    def validate(self, attrs):
        
        # Normalize email before authentication.
        email_field = self.username_field
        
        attrs[email_field] = attrs[email_field].strip().lower()
        
        # Authenticate and generate JWT tokens.
        data = super().validate(attrs)
        
        # Include user information in login response.
        data["user"] = UserSerializer(self.user).data
        
        return data