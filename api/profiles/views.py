from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import ProfileSerializer
import ollama

@api_view(['POST'])
def map_profile(request):
    profile = request.data

    serializer = ProfileSerializer(profile, data=request.data, partial=True)

    if serializer.is_valid():
        model = 'llama3.1:8b'
        question = 'retorne olá mundo em formato JSON. Não fale nada antes ou depois. Simplesmente retorne no formato {"ola_mundo": "Olá mundo"}'

        response = ollama.chat(model=model, messages=[
          {
            'role': 'user',
            'content': question
          }
        ], stream=False)

        return Response(response['message']['content'], status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)