import pytest
from django.contrib.auth.models import User
from users.models import PasswordResetToken

@pytest.mark.django_db
class TestPasswordResetToken:

    def test_create_password_reset_token(self):
        user = User.objects.create_user(username='user5', email='user5@example.com', password='testpassword')
        token = PasswordResetToken.objects.create(user=user)
        
        assert token.user == user
        assert token.token is not None
        assert token.created_at is not None

    def test_unique_token(self):
        user1 = User.objects.create_user(username='user6', email='user6@example.com', password='testpassword')
        user2 = User.objects.create_user(username='user7', email='user7@example.com', password='testpassword')

        token1 = PasswordResetToken.objects.create(user=user1)
        token2 = PasswordResetToken.objects.create(user=user2)

        assert token1.token != token2.token
