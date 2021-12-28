FROM python:3.8-slim-buster

ADD . /app

WORKDIR /app

RUN pip freeze > requirements.txt

RUN pip install -r requirements.txt 

EXPOSE 80

CMD ["python", "main.py"]