from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError as DjangoValidationError

from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

import requests as http_requests
from django.conf import settings
from django.utils import timezone
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests

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
    
class GoogleAuthSerializer(serializers.Serializer):
    access_token = serializers.CharField(required=False, write_only=True)
    credential = serializers.CharField(required=False, write_only=True)
    
    def validate(self, attrs):
        access_token = attrs.get("access_token")
        credential = attrs.get("credential")
        
        if not access_token and not credential:
            raise serializers.ValidationError("Either access_token or credential is required.")
        
        google_user = None
        
        # Path 1: Verify ID token (credential) if provided
        if credential:
            try:
                google_user = id_token.verify_oauth2_token(
                    credential,
                    google_requests.Request(),
                    settings.GOOGLE_OAUTH_CLIENT_ID or None
                )
            except ValueError as exc:
                raise serializers.ValidationError({"credential": "Invalid or expired Google ID token."}) from exc
            
            # Path 2: Verify OAuth2 access_token (from useGoogleLogin hook)
        elif access_token:
            token_info_resp = http_requests.get(
                "https://oauth2.googleapis.com/tokeninfo",
                params={"access_token":access_token},
                timeout=5
            )
            if token_info_resp.status_code != 200:
                raise serializers.ValidationError({"access_token": "Invalid or expired Google access token."})
            
            token_info = token_info_resp.json()
            if (settings.GOOGLE_OAUTH_CLIENT_ID and token_info.get("aud") != settings.GOOGLE_OAUTH_CLIENT_ID):
                raise serializers.ValidationError({"access_token": "Token audience does not match this application."})
            
            userinfo_resp = http_requests.get(
                "https://www.googleapis.com/oauth2/v3/userinfo",
                headers={"Authorization": f"Bearer {access_token}"},
                timeout=5
            )
            if userinfo_resp.status_code != 200:
                raise serializers.ValidationError({"access_token": "Failed to fetch user profile from Google."})
            
            google_user = userinfo_resp.json()
            
            email = (google_user.get("email") or "").strip().lower()
            email_verified = google_user.get("email_verified", False)
            if not email or not email_verified:
                raise serializers.ValidationError("Google account must have a verified email address.")
            
            first_name = (google_user.get("given_name") or "")[:150]
            last_name = (google_user.get("family_name") or "")[:150]
            picture = google_user.get("picture") or ""
            
            user, created = User.objects.get_or_create(
                email=email,
                defaults={
                    "first_name":first_name,
                    "last_name":last_name,
                    "avatar_url":picture,
                    "last_seen_at":timezone.now()
                }
            )
            
            if created:
                user.set_unusable_password()
                user.save(update_fields=["password"])
            else:
                if not user.is_active:
                    raise serializers.ValidationError("This account has been disabled.")
                
                update_fields = ["last_seen_at"]
                user.last_seen_at = timezone.now()
                
                if picture and not user.avatar_url:
                    user.avatar_url = picture
                    update_fields.append("avatar_url")
                    
                if first_name and not user.first_name:
                    user.first_name = first_name
                    update_fields.append("first_name")
                    
                if last_name and not user.last_name:
                    user.last_name = last_name
                    update_fields.append("last_name")
                    
                user.save(update_fields=update_fields)
                
            attrs["user"] = user
            attrs["created"] = created
            
            return attrs