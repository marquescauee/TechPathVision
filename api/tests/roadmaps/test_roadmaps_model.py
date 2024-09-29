from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from roadmaps.models import Roadmap

class RoadmapAPITests(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass')
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

    def test_generate_roadmap(self):
        response = self.client.post('/generate-roadmap', {'title': 'Web Development'}, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('subjects', response.data)

    def test_save_roadmap_invalid(self):
        roadmap_data = {
            'subjects': ['HTML', 'CSS'],
        }
        response = self.client.post('/save-roadmap', roadmap_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
