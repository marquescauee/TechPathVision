from rest_framework.decorators import api_view, authentication_classes, permission_classes
from django.conf import settings
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from users.serializers import UserSerializer
from django.core.mail import send_mail
from users.models import PasswordResetToken
from .serializers import PasswordResetRequestSerializer, PasswordResetConfirmSerializer

@api_view(['POST'])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')
    
    if not email or not password:
        return Response({"detail": "Email and password are required."}, status=status.HTTP_400_BAD_REQUEST)

    user = get_object_or_404(User, email=email)
    if not user.check_password(password):
        return Response({"detail": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(instance=user)

    return Response({"token": token.key, "user": serializer.data})

@api_view(['POST'])
def signup(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token = Token.objects.create(user=user)
        return Response({"token": token.key, "user": serializer.data}, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def validate_token(request):
    return Response("Successfully Authenticated", status=status.HTTP_200_OK)

@api_view(['POST'])
def password_reset_request(request):
    serializer = PasswordResetRequestSerializer(data=request.data)
    if serializer.is_valid():
        email = serializer.validated_data['email']
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"detail": "User with this email does not exist."}, status=status.HTTP_400_BAD_REQUEST)

        token = PasswordResetToken.objects.create(user=user)
        reset_link = f'{settings.FRONTEND_URL}/password-reset-confirm/{token.token}'
        
        send_mail(
            'Password Reset Request',
            f'Click the link below to reset your password:\n{reset_link}',
            'your-email@example.com',
            [email],
            fail_silently=False,
        )
        
        return Response({"detail": "Password reset email has been sent."}, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['POST'])
def password_reset_confirm(request, token):
    serializer = PasswordResetConfirmSerializer(data=request.data)
    if serializer.is_valid():
        token = serializer.validated_data['token']
        new_password = serializer.validated_data['new_password']
        
        reset_token = PasswordResetToken.objects.get(token=token)
        user = reset_token.user
        
        user.set_password(new_password)
        user.save()
        reset_token.delete()
        
        return Response({"detail": "Password has been reset successfully."}, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)