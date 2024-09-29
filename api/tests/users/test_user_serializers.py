import pytest
from django.contrib.auth.models import User
from users.serializers import UserSerializer, UserProfileUpdateSerializer

@pytest.mark.django_db
class TestUserSerializer:

    def test_create_user_valid_data(self):
        data = {
            'email': 'testuser@example.com',
            'first_name': 'Test',
            'password': 'testpassword123'
        }
        serializer = UserSerializer(data=data)
        assert serializer.is_valid()
        user = serializer.save()
        assert user.username 
        assert user.email == data['email']
        assert user.first_name == data['first_name']
        assert user.check_password(data['password'])

    def test_create_user_duplicate_email(self):
        User.objects.create_user(username='user1', email='duplicate@example.com', password='testpassword')
        
        data = {
            'email': 'duplicate@example.com',
            'first_name': 'Test',
            'password': 'testpassword123'
        }
        serializer = UserSerializer(data=data)
        assert not serializer.is_valid()
        assert 'Já existe um usuário com este e-mail cadastrado.' in str(serializer.errors['email'])

    def test_create_user_password_length(self):
        data = {
            'email': 'user2@example.com',
            'first_name': 'Test',
            'password': 'short'
        }
        serializer = UserSerializer(data=data)
        assert not serializer.is_valid()
        assert 'A senha deve ter entre 8 e 16 caracteres.' in str(serializer.errors['password'])

    def test_update_user_profile(self):
        user = User.objects.create_user(username='user3', email='user3@example.com', password='testpassword')
        data = {
            'first_name': 'NewName',
            'current_password': 'testpassword',
            'new_password': 'newpassword123'
        }
        serializer = UserProfileUpdateSerializer(instance=user, data=data, partial=True)
        assert serializer.is_valid()
        updated_user = serializer.save()
        assert updated_user.first_name == 'NewName'
        assert updated_user.check_password('newpassword123')

    def test_update_user_invalid_current_password(self):
        user = User.objects.create_user(username='user4', email='user4@example.com', password='testpassword')
        data = {
            'first_name': 'AnotherName',
            'current_password': 'wrongpassword',
            'new_password': 'newpassword123'
        }
        serializer = UserProfileUpdateSerializer(instance=user, data=data, partial=True)
        assert not serializer.is_valid()
        assert 'A senha atual é inválida.' in str(serializer.errors['detail'])

