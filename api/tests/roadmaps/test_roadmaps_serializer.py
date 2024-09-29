from rest_framework import serializers
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from roadmaps.serializers import RoadmapSerializer

class RoadmapSerializerTests(APITestCase):

    def setUp(self):
        self.user = User.objects.create_user(username='testuser', password='testpass')

    def test_valid_roadmap_serializer(self):
        data = {
            'title': 'Test Roadmap',
            'subjects': ['HTML', 'CSS'],
            'user': self.user.id
        }
        serializer = RoadmapSerializer(data=data)
        self.assertTrue(serializer.is_valid())
        self.assertEqual(serializer.validated_data['title'], 'Test Roadmap')

    def test_invalid_roadmap_serializer_missing_title(self):
        data = {
            'subjects': ['HTML', 'CSS'],
            'user': self.user.id
        }
        serializer = RoadmapSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('title', serializer.errors)

    def test_invalid_roadmap_serializer_missing_user(self):
        data = {
            'title': 'Test Roadmap',
            'subjects': ['HTML', 'CSS'],
        }
        serializer = RoadmapSerializer(data=data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('user', serializer.errors)
