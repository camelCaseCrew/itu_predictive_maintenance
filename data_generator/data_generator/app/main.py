import os
import random

from typing import Union
from fastapi import FastAPI

from data_generator.database.data_loader import DataLoader
from data_generator.data.data_parser import CSVParser
from data_generator.utils.utility import get_data_path

# log_parser = CSVParser(os.path.join(get_data_path(), "harddrive.csv"))
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
