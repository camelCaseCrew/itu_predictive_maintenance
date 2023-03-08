FROM python:3.10

ENV DATABASE_HOST db
ENV DATABASE_PORT 5432
ENV DATABASE_NAME postgres
ENV DATABASE_USERNAME postgres
ENV DATABASE_PASSWORD postgres

WORKDIR /app

COPY ./data_generator .

RUN pip install -e .
RUN pip install uvicorn

CMD ["uvicorn", "data_generator.app.main:app", "--host", "0.0.0.0", "--port", "8000"]
