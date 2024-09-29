from rest_framework import serializers
from django.contrib.auth.models import User
import random
import string

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField(required=True)
    first_name = serializers.CharField(required=True)
    username = serializers.CharField(read_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'first_name', 'password')
    
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Já existe um usuário com este e-mail cadastrado.")
        return value
    
    def validate_password(self, value):
        if len(value) < 8 or len(value) > 16:
            raise serializers.ValidationError("A senha deve ter entre 8 e 16 caracteres.")
        return value

    def generate_random_username(self):
        return ''.join(random.choices(string.ascii_letters + string.digits, k=50))

    def create(self, validated_data):
        username = self.generate_random_username()
        
        user = User.objects.create_user(
            username=username,
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name']
        )
        return user

class UserProfileUpdateSerializer(serializers.ModelSerializer):
    current_password = serializers.CharField(write_only=True, required=False, allow_blank=True)
    new_password = serializers.CharField(write_only=True, required=False, allow_blank=True)
    first_name = serializers.CharField(required=False)

    class Meta:
        model = User
        fields = ('first_name', 'current_password', 'new_password')

    def validate(self, attrs):
        current_password = attrs.get('current_password')
        user = self.instance
        
        if current_password and not user.check_password(current_password):
            raise serializers.ValidationError({"detail": "A senha atual é inválida."})

        return attrs

    def update(self, instance, validated_data):
        if 'first_name' in validated_data:
            instance.first_name = validated_data['first_name']

        if 'new_password' in validated_data and validated_data['new_password']:
            instance.set_password(validated_data['new_password'])

        instance.save()
        return instance

