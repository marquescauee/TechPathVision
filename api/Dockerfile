FROM python:3.12

WORKDIR /api

RUN apt-get update && apt-get install -y curl

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

RUN curl -fsSL https://ollama.com/install.sh | sh

COPY . .

COPY init_db.py ./

ENV PYTHONPATH=/techPathVision

ENV DJANGO_SETTINGS_MODULE=techPathVision.settings

EXPOSE 8000

CMD ollama serve & \
  sleep 5 && \
  ollama pull llama3.2:3b && \
  python manage.py makemigrations && \
  python manage.py migrate && \
  python manage.py makemigrations attributes && \
  python manage.py migrate attributes && \
  python manage.py makemigrations profiles && \
  python manage.py migrate profiles && \
  python manage.py makemigrations roadmaps && \
  python manage.py migrate roadmaps && \
  python manage.py makemigrations careers && \
  python manage.py migrate careers && \
  python init_db.py && \
  python manage.py runserver 0.0.0.0:8000
