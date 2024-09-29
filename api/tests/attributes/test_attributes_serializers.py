import pytest
from attributes.models import Attribute
from attributes.serializers import AttributeSerializer

@pytest.mark.django_db
class TestAttributeSerializer:

    def test_valid_serializer(self):
        data = {
            'label': 'Attribute1',
            'value': 'Value1',
        }
        serializer = AttributeSerializer(data=data)
        assert serializer.is_valid()
        attribute = serializer.save()
        assert attribute.label == data['label']
        assert attribute.value == data['value']

    def test_invalid_serializer_missing_label(self):
        data = {
            'value': 'Value1',
        }
        serializer = AttributeSerializer(data=data)
        assert not serializer.is_valid()
        assert 'label' in serializer.errors

    def test_invalid_serializer_missing_value(self):
        data = {
            'label': 'Attribute1',
        }
        serializer = AttributeSerializer(data=data)
        assert not serializer.is_valid()
        assert 'value' in serializer.errors

    def test_invalid_serializer_duplicate_label(self):
        Attribute.objects.create(label='Attribute1', value='Value1')
        data = {
            'label': 'Attribute1',
            'value': 'Value2',
        }
        serializer = AttributeSerializer(data=data)
        assert not serializer.is_valid()
        assert 'label' in serializer.errors

    def test_invalid_serializer_duplicate_value(self):
        Attribute.objects.create(label='Attribute2', value='Value1')
        data = {
            'label': 'Attribute3',
            'value': 'Value1',
        }
        serializer = AttributeSerializer(data=data)
        assert not serializer.is_valid()
        assert 'value' in serializer.errors
