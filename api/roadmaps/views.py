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
        model = 'llama3.2:3b'
        question = f'Tomando como base a área de {career}, elabore um roadmap de estudos que tenha no mínimo 2 assuntos. Crie um JSON e para cada assunto, informe seu título e o máximo de informações possível sobre aquele assunto. Seja bem extenso, pois o iniciante que estiver lendo precisa ter o máximo de informações possível. Além disso, forneça um campo no JSON com sites que abordem aquele assunto. Se você não possui certeza que o link está ativo, informe apenas o nome do site/empresa que fornece conhecimento sobre. Retorne apenas o JSON com os subjects, sem texto antes ou depois. O roadmap deve ser retornado em ordem de estudo e sequencial, de modo a guiar o usuário. Não repita subjects. O seu resultado para a descrição deve ter as mesmas chaves e ser maior do que a do seguinte exemplo: {jsonExample}'

        json_example_str = json.dumps(jsonExample)
        json_career = json.dumps(career)
        question = question.replace("{jsonExample}", json_example_str)
        question = question.replace("{career}", json_career)

        response = ollama.chat(model=model, messages=[
          {
            'role': 'user',
            'content': question
          }
        ], stream=False)

        return Response(response['message']['content'], status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def generate_subject_content(request):

    textExample = "O Header é um elemento HTML que representa a parte superior de uma página web, geralmente contendo informações como o título da página ou informações de contato. Deve ser usado para fornecer uma breve descrição da página e para ajudar os motores de busca a entender o conteúdo da página."

    content = request.data['content']

    model = 'llama3.2:3b'
    question = f'com base no conteudo {content}, gere um texto mais explicativo possível sobre o mesmo. Retorne no formato de markdown, fazendo o uso de titulos, listas, links ou outros recursos disponívies. Se for utilizar linhas horizontais, utilize o formato markdown para isso. Sempre que for informar trechos de código que representem o tópico, utilize formatações markdown para <pre> e <code>. Não fale nada antes ou depois do texto gerado. Exemplo de texto: {textExample}. Forneça o máximo de informações possível. Sua resposta deve ser maior que o exemplo.'

    json_content = json.dumps(content)
    question = question.replace("{content}", json_content)
    question = question.replace("{textExample}", textExample)

    response = ollama.chat(model=model, messages=[
        {
        'role': 'user',
        'content': question
        }
    ], stream=False)

    return Response(response['message']['content'], status=status.HTTP_201_CREATED)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def save_roadmap(request):
    roadmap_data = request.data.get('roadmap')
    user_token = request.data.get('token')

    try:
        token = Token.objects.get(key=user_token)
        user = token.user
    except Token.DoesNotExist:
        return Response({'error': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)

    roadmap_data['user'] = user.id
    
    serializer = RoadmapSerializer(data=roadmap_data)

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
