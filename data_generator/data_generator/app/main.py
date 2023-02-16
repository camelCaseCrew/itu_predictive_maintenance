import random

from typing import Union
from fastapi import FastAPI

from data_generator.database.data_loader import DataLoader
from data_generator.data_generator.data.data_parser import LogParser

log_parser = LogParser()
log_parser()

app = FastAPI()
data_loader = DataLoader()
ids = data_loader.get_ids()

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/logs/get_record")
def get_record():
    return data_loader.get_log_message(random.choice(ids)).log_message
