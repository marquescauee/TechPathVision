import json
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Roadmap
from careers.serializers import CareerSerializer
from .serializers import RoadmapSerializer
from rest_framework.authtoken.models import Token
from typing import Dict, Any
import ollama

@api_view(['POST'])
def generate_roadmap(request):

    jsonExample: Dict[str, Any] = {
        "subjects": [
            {
                "title": "HTML",
                "description": "Hypertext Markup Language é a linguagem de marcação usada para estruturar e se comunicar conteúdo na web. É o elemento básico da construção da estrutura de uma página.",
                "content": [
                    "Elementos semânticos (header, nav, main, section, article, aside, footer)",
                    "Atributos comuns (id, class, style, title)",
                    "Tags para texto e cores (p, span, em, strong, u, i, b, color, font-size)",
                    "Estruturas de dados (table, tr, th, td)",
                    "Formulários (form, input, textarea, select, button)"
                ],
                "documentation": [
                    {
                        "title": "MDN Web Docs - HTML",
                        "url": "https://developer.mozilla.org/pt-BR/docs/Web/HTML"
                    },
                    {
                        "title": "W3Schools - HTML",
                        "url": "https://www.w3schools.com/html/"
                    }
                ]
            },
            {
                "title": "CSS",
                "description": "Cascading Style Sheets é uma linguagem de estilo usada para adicionar visualizações a um website. Ela permite mudar layout e aparência da página.",
                "content": [
                    "Séletor (class, id, tag, atributo)",
                    "Propriedades comuns (color, background-color, font-size, text-align)",
                    "Modelo de caixa (box-sizing, padding, margin, border)",
                    "Posicionamento de elementos (position, top, right, bottom, left)",
                    "Efeitos e animações"
                ],
                "documentation": [
                    {
                        "title": "MDN Web Docs - CSS",
                        "url": "https://developer.mozilla.org/pt-BR/docs/Web/CSS"
                    },
                    {
                        "title": "W3Schools - CSS",
                        "url": "https://www.w3schools.com/css/"
                    }
                ]
            }
        ]
    }

    career = request.data

    serializer = CareerSerializer(data=career)

    if serializer.is_valid():
        model = 'llama3.1:8b'
        question = f'Tomando como base a área de Segurança da Informação, elabore um roadmap de estudos que tenha no mínimo 10 subjects. Crie um JSON e para cada assunto, informe seu título e o máximo de informações possível sobre aquele assunto. Seja bem extenso, pois o iniciante que estiver lendo precisa ter o máximo de informações possível. Além disso, forneça um campo no JSON com sites que abordem aquele assunto. Se você não possui certeza que o link está ativo, informe apenas o nome do site/empresa que fornece conhecimento sobre. Retorne apenas o JSON, sem texto antes ou depois. O roadmap deve ser retornado em ordem de estudo e sequencial, de modo a guiar o usuário. Não repita subjects. O seu resultado para a descrição deve ter as mesmas chaves e ser maior do que a do seguinte exemplo: {jsonExample}'

        json_example_str = json.dumps(jsonExample)
        question = question.replace("{jsonExample}", json_example_str)

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
