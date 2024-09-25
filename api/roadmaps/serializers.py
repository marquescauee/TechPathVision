from rest_framework import serializers
from .models import Roadmap

class RoadmapSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roadmap
        fields = ('title', 'subjects')

