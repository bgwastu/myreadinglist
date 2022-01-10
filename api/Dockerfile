FROM python:3.8-slim-buster
ADD . /app
WORKDIR /app
RUN pip install -r requirements.txt
ENV HOST 0.0.0.0
EXPOSE 5000
CMD ["python", "./main.py"]