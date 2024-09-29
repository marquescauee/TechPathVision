from django.db import models
import uuid
from django.contrib.postgres.fields import ArrayField

class Profile(models.Model):
    id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, primary_key=True)
    attributes = ArrayField(models.CharField(max_length=200), blank=True)
    

    def __str__(self):
        return f"{self.id}"
