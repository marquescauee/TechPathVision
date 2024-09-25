from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Roadmap
from careers.serializers import CareerSerializer
import ollama

@api_view(['POST'])
def generate_roadmap(request):
    career = request.data

    serializer = CareerSerializer(data=career)

    if serializer.is_valid():
        model = 'llama3.1:8b'
        question = 'retorne olá mundo em formato JSON. Não fale nada antes ou depois. Simplesmente retorne no formato {"ola_mundo": "Olá mundo"}'

        response = ollama.chat(model=model, messages=[
          {
            'role': 'user',
            'content': question
          }
        ], stream=False)

        return Response(response['message']['content'], status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def save_roadmap(request):
    roadmap = request.data
    serializer = RoadmapSerializer(roadmap, data=request.data, partial=True)

    if serializer.is_valid():
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_roadmaps(request):
    roadmaps = Roadmap.objects.filter(user=request.user)
    serializer = RoadmapSerializer(roadmaps, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)