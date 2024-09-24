from rest_framework import serializers
from django.contrib.auth.models import User
from users.models import PasswordResetToken

class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError("No user with this email address.")
        return value

class PasswordResetConfirmSerializer(serializers.Serializer):
    token = serializers.UUIDField()
    new_password = serializers.CharField(write_only=True)
    
    def validate_token(self, value):
        if not PasswordResetToken.objects.filter(token=value).exists():
            raise serializers.ValidationError("Token expirado. Por favor, solicite a redefinição de senha novamente.")
        return value
    
    def validate_new_password(self, value):
        if len(value) < 8 or len(value) > 16:
            raise serializers.ValidationError("A senha deve ter entre 8 e 16 caracteres.")
        return value