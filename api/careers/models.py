from django.db import models
import uuid
from django.contrib.postgres.fields import ArrayField

class Career(models.Model):
    id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, primary_key=True)
    title = models.CharField(null=False, unique=True)
    shortDescription = models.CharField(null=False, unique=False)
    longDescription1 = models.CharField(null=False, unique=False)
    longDescription2 = models.CharField(null=False, unique=False)
    longDescription3 = models.CharField(null=False, unique=False)
    longDescription4 = models.CharField(blank=True, unique=False)
    longDescription5 = models.CharField(blank=True, unique=False)
    skills = ArrayField(models.CharField(max_length=200), blank=True)
    

    def __str__(self):
        return f"{self.id} - {self.title}"
