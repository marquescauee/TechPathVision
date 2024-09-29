import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework.authtoken.models import Token
from attributes.models import Attribute
from django.contrib.auth.models import User
from rest_framework.test import APIClient


@pytest.mark.django_db
class TestAttributeViews:

    @pytest.fixture
    def admin_user(self):
        user = User.objects.create_user(username='admin', password='testpassword')
        user.is_staff = True
        user.save()
        Token.objects.create(user=user)
        return user

    def test_get_attributes(self):
        client = APIClient()
        url = reverse('get_attributes')
        response = client.get(url)
        assert response.status_code == status.HTTP_200_OK

    def test_send_attributes_as_admin(self, admin_user):
        client = APIClient()
        client.login(username='admin', password='testpassword')
        url = reverse('send_attributes')

        data = [
            {'label': 'Attribute1', 'value': 'Value1'},
            {'label': 'Attribute2', 'value': 'Value2'},
        ]
        
        response = client.post(url, data, format='json')

        assert response.status_code == status.HTTP_201_CREATED

    def test_send_attributes_as_non_admin(self):
        user = User.objects.create_user(username='user', password='testpassword')
        client = APIClient()
        client.login(username='user', password='testpassword')
        url = reverse('send_attributes')
        
        data = [{'name': 'Attribute1', 'value': 'Value1'}]
        response = client.post(url, data, format='json')
        
        assert response.status_code == status.HTTP_403_FORBIDDEN
