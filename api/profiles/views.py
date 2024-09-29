import json
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import ProfileSerializer
from typing import Dict, Any
import ollama

@api_view(['POST'])
def map_profile(request):
    
    jsonExample: Dict[str, Any] = [
      {
      "title": "Desenvolvimento Web",
      "shortDescription": "O desenvolvimento de aplicações web envolve criar soluções online que atendam às necessidades dos usuários, aproveitando as potencialidades do NodeJS e Python em linguagens de programação. A colaboração é fundamental para garantir a criação de produtos inovadores que sejam intuitivos, seguros e escaláveis. Com um foco em inteligência artificial, os desenvolvedores precisam estar atentos às necessidades dos usuários e criar soluções personalizadas.",
      "longDescription1": "O desenvolvimento de aplicações web envolve uma ampla gama de habilidades, desde a criação de interfaces do usuário até a implementação de lógica de negócios. Com o NodeJS, os desenvolvedores podem criar servidores que respondam rapidamente às requisições dos usuários, enquanto com o Python, eles podem aproveitar as ferramentas de análise de dados para melhorar as experiências dos usuários.",
      "longDescription2": "Além disso, a colaboração é fundamental no desenvolvimento de aplicações web. Os desenvolvedores precisam trabalhar em equipe com designers, analistas de negócios e outros especialistas para garantir que as soluções criadas sejam inovadoras, seguras e escaláveis.",
      "longDescription3": "A inteligência artificial também desempenha um papel crucial no desenvolvimento de aplicações web. Os desenvolvedores podem usar técnicas como machine learning para melhorar a experiência dos usuários, fornecendo recomendações personalizadas e predições precisas.",
      "longDescription4": "Por fim, os desenvolvedores de aplicações web devem estar atentos às necessidades dos usuários e criar soluções que sejam intuitivas e fáceis de usar. Isso inclui a criação de interfaces do usuário que sejam claras e concisas, além da implementação de mecanismos de navegação eficientes.",
      "longDescription5": "Por fim, os desenvolvedores de aplicações web devem sempre considerar as expectativas dos usuários, desenvolvendo soluções que sejam acessíveis e agradáveis. Isso envolve projetar interfaces que sejam não apenas atraentes, mas também funcionais, garantindo que os elementos sejam organizados de forma lógica. Além disso, é fundamental implementar sistemas de navegação que facilitem a exploração do conteúdo, permitindo que os usuários encontrem rapidamente o que procuram.",
      "skills": ["Desenvolvimento web com NodeJS e Python", "Inteligência artificial para análise de dados", "Colaboração em equipe", "Design responsivo e intuitivo"]
      },
      {
        "title": "Desenvolvimento de Sistemas",
        "shortDescription": "O desenvolvimento de sistemas envolve criar soluções complexas que atendam às necessidades dos usuários, utilizando habilidades em diversas áreas como hardware, software e inteligência artificial.",
        "longDescription1": "O desenvolvimento de sistemas é um campo amplo que requer habilidades em diversas áreas, incluindo hardware, software e inteligência artificial. Os desenvolvedores precisam criar soluções que sejam escaláveis, seguras e fáceis de usar, utilizando tecnologias como sistemas operacionais, redes de computadores e bancos de dados.",
        "longDescription2": "A colaboração é fundamental no desenvolvimento de sistemas. Os desenvolvedores precisam trabalhar em equipe com especialistas em diferentes áreas para garantir que as soluções criadas sejam inovadoras e eficazes.",
        "longDescription3": "A inteligência artificial também desempenha um papel crucial no desenvolvimento de sistemas. Os desenvolvedores podem usar técnicas como machine learning para melhorar a eficiência dos sistemas, automatizando processos e análises.",
        "longDescription4": "Os desenvolvedores de sistemas devem estar atentos às necessidades dos usuários e criar soluções que sejam intuitivas e fáceis de usar. Isso inclui a criação de interfaces do usuário que sejam claras e concisas, além da implementação de mecanismos de navegação eficientes.",
        "longDescription5": "Além disso, os desenvolvedores de sistemas devem considerar as implicações ambientais e sociais das suas soluções. Eles precisam criar sistemas que sejam sustentáveis e responsáveis, minimizando o impacto negativo nas comunidades e no meio ambiente.",
        "habilidades": [
          "Desenvolvimento de sistemas com foco em hardware e software",
          "Inteligência artificial para análise de dados e automação"
        ]
      }
    ]

    profile = request.data

    serializer = ProfileSerializer(profile, data=request.data, partial=True)

    if serializer.is_valid():
        model = 'llama3.2:3b'
        question = f'vou te passar alguns atributos e interesses e preciso que você mapeie as 5 áreas mais compatíveis com o perfil de usuário informado. Para cada área, você deve estruturar um JSON que contenha: título da área, descrição resumida e descrição detalhada. A descrição resumida deve ter algo entre 5 e 10 linhas. A descrição detalhada deve ser muito bem descrita, informando diversos detalhes da área. Responda apenas o array de JSON, sem textos adicionais antes ou depois. Os atributos são: {profile}. Para cada campo do JSON, você deve trazer a resposta em texto corrido. Não repita áreas com o mesmo título. Foque em trazer títulos que sejam noticiados na mídia ou em artigos. Por exemplo, desenvolvimento de aplicações envolve muita coisa. Nesse caso, você deve quebrar essa área em várias, como Front-End, Back-End, Administrador de Banco de Dados, Arquiteto de Software e etc. No resumo, escreva em texto corrido sem utilizar tantas frases curtas. Articule um pouco mais, com conectivos, conjunções, etc. O JSON pode ter as chaves "title", "shortDescription" e "longDescription1", "longDescription2" e etc. No fim, deve ter um campo "habilidades", em que você vai elencar as habilidades necessárias para aquela área. Diversifique ao máximo as áreas mapeadas, evitando informar áreas com características semelhantes. Utilize esse JSON como exemplo: {jsonExample}'

        json_example_str = json.dumps(jsonExample)
        json_profile = json.dumps(profile)

        question = question.replace("{jsonExample}", json_example_str)
        question = question.replace("{profile}", json_profile)

        response = ollama.chat(model=model, messages=[
          {
            'role': 'user',
            'content': question
          }
        ], stream=False)

        return Response(response['message']['content'], status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)