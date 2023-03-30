FROM python:3.10

WORKDIR /app

COPY ./predictive_maintenance .

RUN pip install -e .

CMD ["python", "predictive_maintenance/app/main.py"]
