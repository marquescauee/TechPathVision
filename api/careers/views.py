from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import CareerSerializer
import ollama

@api_view(['POST'])
def map_profile(request):
    careers = request.data

    formattedCareers = {
        "careers": careers
    }

    serializer = CareerSerializer(formattedCareers, data=request.data, partial=True)

    if serializer.is_valid():
        model = 'llama3.1:8b'
        question = 'retorne olá mundo em formato JSON. Não fale nada antes ou depois.'

        response = ollama.chat(model=model, messages=[
          {
            'role': 'user',
            'content': question
          }
        ], stream=False)

        return Response(response, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)