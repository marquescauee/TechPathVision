import pytest
from rest_framework.exceptions import ValidationError
from profiles.serializers import ProfileSerializer

@pytest.mark.django_db
class TestProfileSerializer:

    def test_valid_serializer(self):
        data = {
            'attributes': ['Attribute1', 'Attribute2']
        }
        serializer = ProfileSerializer(data=data)
        assert serializer.is_valid()
        assert serializer.validated_data['attributes'] == data['attributes']

    def test_invalid_serializer(self):
        data = {
            'attributes': None
        }
        serializer = ProfileSerializer(data=data)
        assert not serializer.is_valid()
        with pytest.raises(ValidationError):
            serializer.is_valid(raise_exception=True)
