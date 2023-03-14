from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.responses import PlainTextResponse

from prometheus_client import Gauge, Summary, generate_latest
import random
import time
import requests

app = FastAPI()

metricsOutput = Gauge('device_health', 'Device Health (lower is better)', [
                      'id', 'model'])


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/metrics")
def metrics():
    for i in range(10):
        # get a random record
        inputDevice = requests.get("http://localhost:8000/get_record").json()
        id = inputDevice["id"]
        model = inputDevice["model"]

        # remove identifying info for the machine learning model
        remove_keys = ["failure", "model", "serial_number", "date", "id"]
        for key in remove_keys:
            del inputDevice[key]

        # give record to machine learning model
        pred = requests.post("http://localhost:8001/predict", json=inputDevice)
        metricsOutput.labels(id, model).set(
            pred.json()['failure_prediction'])
    # update the gauge and show the output as text
    return PlainTextResponse(generate_latest(metricsOutput))
