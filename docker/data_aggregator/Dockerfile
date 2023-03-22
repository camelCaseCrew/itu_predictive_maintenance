FROM python:3.10

WORKDIR /app

COPY ./data_aggregator .

RUN pip install prometheus-client

CMD ["python", "main.py"]
