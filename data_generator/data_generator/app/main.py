# run
# docker compose -f docker/docker-compose.yaml build data_generator
# whenever this file is changed

import os
import random
import time
import json

from typing import Union

from data_generator.database.data_loader import DataLoader
from data_generator.data.data_parser import CSVParser
from data_generator.utils.utility import get_data_path
import pika
import random
import sys

low_throughput = 250
medium_throughput = 1000
high_throughput = 4000

arg = int(sys.argv[1]) if len(sys.argv) > 1 else 2

frequency = low_throughput if arg == 1 else high_throughput if arg == 3 else medium_throughput 

connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq'))
channel = connection.channel()

channel.queue_declare(queue='unprocessed_data')

data_loader = DataLoader()
ids = data_loader.get_ids()
if len(ids) == 0:
    log_parser = CSVParser(os.path.join(get_data_path(), "harddrive.csv"), 50001)
    log_parser()
    ids = data_loader.get_ids()
failure_ids = data_loader.get_failure_ids()

def get_record(debug: bool = False):
    if debug:
        return data_loader.get_record(random.choice(failure_ids))
    return data_loader.get_record(random.choice(ids))

def publish_message(msg: str):
    channel.basic_publish(exchange='',
                      routing_key='unprocessed_data',
                      body=json.dumps(msg)) # JSON encode

def simulate():
    while True:
        msg = get_record()
        del msg['failure'] # Remove failure key
        type_int = random.randint(0, 1)
        # Choose between 'harddrive' and 'sensor' device type at random
        if type_int == 0:
            msg['device_type'] = 'harddrive'
        else:
            msg['device_type'] = 'sensor'
        publish_message(msg)
        time.sleep(60./frequency)

simulate()