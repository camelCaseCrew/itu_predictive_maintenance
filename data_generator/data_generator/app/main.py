import random

from typing import Union
from fastapi import FastAPI

from data_generator.database.data_loader import DataLoader
from data_generator.data.data_parser import CSVParser

# log_parser = CSVParser()
# log_parser()

app = FastAPI()
data_loader = DataLoader()
ids = data_loader.get_ids()

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/get_record")
def get_record():
    return data_loader.get_record(random.choice(ids))
