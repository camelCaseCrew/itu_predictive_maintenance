# run
# docker compose -f docker/docker-compose.yaml build data_generator
# whenever this file is changed

import os
import random
import sys

from typing import Union
from fastapi import FastAPI

from data_generator.database.data_loader import DataLoader
from data_generator.data.data_parser import CSVParser
from data_generator.utils.utility import get_data_path


app = FastAPI()
data_loader = DataLoader()
ids = data_loader.get_ids()
if len(ids) == 0:
    log_parser = CSVParser(os.path.join(get_data_path(), "harddrive.csv"))
    log_parser()
    ids = data_loader.get_ids()
failure_ids = data_loader.get_failure_ids()

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/get_record")
def get_record(debug: bool = False):
    if debug:
        return data_loader.get_record(random.choice(failure_ids))
    return data_loader.get_record(random.choice(ids))
