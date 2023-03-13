FROM python:3.10

WORKDIR /app

COPY ./predictive_maintenance .

RUN pip install -e .
RUN pip install requests
RUN pip install prometheus-client
RUN pip install uvicorn

CMD ["uvicorn", "predictive_maintenance.app.main:app", "--host", "0.0.0.0", "--port", "8001"]
