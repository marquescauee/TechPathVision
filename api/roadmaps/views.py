from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Roadmap
from careers.serializers import CareerSerializer
from .serializers import RoadmapSerializer
from rest_framework.authtoken.models import Token
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
    roadmap_data = request.data.get('roadmap')
    user_token = request.data.get('token')

    try:
        token = Token.objects.get(key=user_token)
        user = token.user
        print(user)
    except Token.DoesNotExist:
        return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)

    roadmap_data['user'] = user.id
    
    serializer = RoadmapSerializer(data=roadmap_data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    print(serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_roadmaps(request):
    roadmaps = Roadmap.objects.filter(user=request.user)
    serializer = RoadmapSerializer(roadmaps, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
