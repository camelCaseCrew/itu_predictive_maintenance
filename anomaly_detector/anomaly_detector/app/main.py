from fastapi import FastAPI
from pydantic import BaseModel

from anomaly_detector.model.inference import Inference

app = FastAPI()
inference = Inference()

class Prediction(BaseModel):
    log_message: str
    anomaly_score: float
    is_anoamly: bool

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/logs/predict/", response_model=Prediction)
def predict(log_message: str, threshold: float = 0.02):
    anomaly_score = inference(log_message)
    is_anoamly = False
    if anomaly_score > threshold:
        is_anoamly = True
    return Prediction(log_message=log_message, anomaly_score=anomaly_score, is_anoamly=is_anoamly)
