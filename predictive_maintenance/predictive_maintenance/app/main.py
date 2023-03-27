# run
# docker compose -f docker/docker-compose.yaml build anomaly_detector
# whenever this file is changed

from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.responses import PlainTextResponse

from prometheus_client import Gauge, Summary, generate_latest
import random
import time
import requests

from predictive_maintenance.model.inference import Inference

app = FastAPI()
inference = Inference()

class Prediction(BaseModel):
    failure_prediction: float

metricsOutput = Gauge('device_health', 'Device Health (lower is better)', [
                      'serial_number', 'model', 'group'])

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/metrics")
def metrics():
    for i in range(10):
        # get a random record
        inputDevice = requests.get("http://data_generator:8000/get_record").json()
        serial_number = inputDevice["serial_number"]
        model = inputDevice["model"]

        # remove identifying info for the machine learning model
        remove_keys = ["failure", "model", "serial_number", "date", "id"]
        for key in remove_keys:
            del inputDevice[key]

        # give record to machine learning model
        pred = requests.post("http://predictive_maintenance:8001/predict", json=inputDevice)
        failure_rate = float(pred.json()['failure_prediction'])

        # assign metric to group
        group = ""
        if failure_rate >= 0.5:
            group = "critical"
        elif failure_rate < 0.5 and failure_rate >= 0.1:
            group = "risk"
        elif failure_rate < 0.1:
            group = "healthy"

        metricsOutput.labels(serial_number, model, group).set(pred.json()['failure_prediction'])
    # update the gauge and show the output as text
    return PlainTextResponse(generate_latest(metricsOutput))

@app.post("/predict/", response_model=Prediction)
def predict(data: dict):
    prediction = inference.predict(data)
    return Prediction(failure_prediction=prediction)
