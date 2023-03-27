FROM python:3.10

ENV DATABASE_HOST db
ENV DATABASE_PORT 5432
ENV DATABASE_NAME postgres
ENV DATABASE_USERNAME postgres
ENV DATABASE_PASSWORD postgres

WORKDIR /app

COPY ./data_generator .

RUN pip install -e .

ENTRYPOINT ["python3", "data_generator/app/main.py"]
