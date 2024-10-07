import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'techPathVision.settings')
django.setup()

print("INICIANDO A INSERÇÃO DE DADOS...")

from attributes.models import Attribute

data = [
    {"label": "Nodejs", "value": "NODEJS"},
    {"label": "Python", "value": "PYTHON"},
    {"label": "Inteligência Artificial", "value": "INTELIGENCIA_ARTIFICIAL"},
    {"label": "Gestão", "value": "GESTAO"},
    {"label": "Java", "value": "JAVA"},
    {"label": "Ruby", "value": "RUBY"},
    {"label": "Persistente", "value": "PERSISTENTE"},
    {"label": "Paciente", "value": "PACIENTE"},
    {"label": "Analítico", "value": "ANALITICO"},
    {"label": "PHP", "value": "PHP"},
    {"label": "Hardware", "value": "HARDWARE"},
    {"label": "Automação", "value": "AUTOMACAO"},
    {"label": "Criativo", "value": "CRIATIVO"},
    {"label": "Organizado", "value": "ORGANIZADO"},
    {"label": "Resiliente", "value": "RESILIENTE"},
    {"label": "Colaborativo", "value": "COLABORATIVO"},
    {"label": "Proativo", "value": "PROATIVO"},
    {"label": "Flexível", "value": "FLEXIVEL"},
    {"label": "Comunicativo", "value": "COMUNICATIVO"},
    {"label": "Determinado", "value": "DETERMINADO"},
    {"label": "Empático", "value": "EMPATIA"},
    {"label": "Autodidata", "value": "AUTODIDATA"},
    {"label": "Motivado", "value": "MOTIVADO"},
    {"label": "Curioso", "value": "CURIOSO"},
    {"label": "Detalhista", "value": "DETALHISTA"},
]

existing_values = {attr.value for attr in Attribute.objects.all()}

for item in data:
    if item["value"] not in existing_values:
        Attribute.objects.create(**item)
        print(f"Dados inseridos: {item['label']}")

print("DADOS INSERIDOS COM SUCESSO!")
