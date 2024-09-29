from rest_framework.test import APIClient
from django.contrib.auth.models import User
import pytest

@pytest.mark.django_db
def test_update_user():
    client = APIClient()
    user = User.objects.create_user(username='testuser', password='testpass')
    client.force_authenticate(user=user)

    response = client.patch('/update-user/', {'first_name': 'NewName'})
    assert response.status_code == 200
    assert response.data['user']['first_name'] == 'NewName'

@pytest.mark.django_db
def test_get_user():
    client = APIClient()
    user = User.objects.create_user(username='testuser', password='testpass')
    client.force_authenticate(user=user)

    response = client.get('/get-user/')
    assert response.status_code == 200
    assert response.data['username'] == 'testuser'
