import pytest
from careers.serializers import CareerSerializer

@pytest.mark.django_db
class TestCareerSerializer:

    def test_valid_serializer(self):
        career_data = {'title': 'Software Engineer'}
        serializer = CareerSerializer(data=career_data)
        assert serializer.is_valid()
        assert serializer.validated_data['title'] == 'Software Engineer'

    def test_invalid_serializer_missing_title(self):
        career_data = {}
        serializer = CareerSerializer(data=career_data)
        assert not serializer.is_valid()
        assert 'title' in serializer.errors
