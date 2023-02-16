FROM python:3.10

WORKDIR /app

COPY ./anomaly_detector .

RUN pip install -e .
RUN pip install uvicorn

CMD ["uvicorn", "anomaly_detector.app.main:app", "--host", "0.0.0.0", "--port", "8001"]


