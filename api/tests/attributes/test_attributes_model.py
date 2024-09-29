import pytest
from django.db import IntegrityError
from attributes.models import Attribute
import uuid

@pytest.mark.django_db
class TestAttributeModel:

    def test_create_attribute(self):
        attribute = Attribute.objects.create(label='Attribute1', value='Value1')
        assert attribute.id is not None
        assert attribute.label == 'Attribute1'
        assert attribute.value == 'Value1'

    def test_attribute_str_method(self):
        attribute = Attribute(label='Attribute2', value='Value2')
        assert str(attribute) == 'Attribute2 - Value2'

    def test_create_attribute_duplicate_label(self):
        Attribute.objects.create(label='Attribute3', value='Value3')
        with pytest.raises(IntegrityError) as excinfo:
            Attribute.objects.create(label='Attribute3', value='Value4')
        assert 'já existe' in str(excinfo.value)

    def test_create_attribute_duplicate_value(self):
        Attribute.objects.create(label='Attribute4', value='Value5')
        with pytest.raises(IntegrityError) as excinfo:
            Attribute.objects.create(label='Attribute5', value='Value5')

        assert 'já existe' in str(excinfo.value)

    def test_attribute_id_is_uuid(self):
        attribute = Attribute.objects.create(label='Attribute6', value='Value6')
        assert isinstance(attribute.id, uuid.UUID)
