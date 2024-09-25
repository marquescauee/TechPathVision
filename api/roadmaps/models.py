from django.db import models
import uuid
from django.contrib.auth.models import User

class Roadmap(models.Model):
    id = models.UUIDField(default=uuid.uuid4, editable=False, unique=True, primary_key=True)
    title = models.CharField(max_length=255, unique=True)
    subjects = models.JSONField() 
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='roadmaps')

    class Meta:
        db_table = 'roadmaps'

    def __str__(self):
        return f"{self.id} - {self.title}"
