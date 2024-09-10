from django.db import models
import uuid

class Attribute(models.Model):
    id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, primary_key=True)
    label = models.CharField(null=False, unique=True)
    value = models.CharField(null=False, unique=True)
    
    class Meta:
        db_table = 'attributes'

    def __str__(self):
        return f"{self.label} - {self.value}"
