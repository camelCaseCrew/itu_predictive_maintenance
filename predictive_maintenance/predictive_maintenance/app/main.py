# run
# docker compose -f docker/docker-compose.yaml build anomaly_detector
# whenever this file is changed

from pydantic import BaseModel

import pika
import json
import codecs

from predictive_maintenance.model.inference import Inference

connection = pika.BlockingConnection(pika.ConnectionParameters('rabbitmq'))
channel = connection.channel()


channel.queue_declare(queue='unprocessed_data')
channel.queue_declare(queue='processed_data')

inference = Inference()

class Prediction(BaseModel):
    failure_prediction: float

def predict(data: dict):
    prediction = inference.predict(data)
    return prediction


def process_data(ch, method, properties, body):

    # Body deserialized from json to python dict
    body_string = body.decode('utf-8')
    body_deserialized = json.loads(body_string)

    # Create dict for processed data
    processed_data = {
        "date": body_deserialized["date"],
        "serial_number": body_deserialized["serial_number"],
        "model": body_deserialized["model"],
        "device_type": body_deserialized["device_type"],
        "capacity_bytes": body_deserialized["capacity_bytes"]
    }

    # Remove certain keys not used for prediction
    remove_keys = ["model", "serial_number", "date", "device_type", "id"]
    for key in remove_keys:
        del body_deserialized[key]
    
    prediction = predict(body_deserialized)

    # Add the prediction to the processed_data dict
    processed_data['failure_prediction'] = prediction

    # Publish processed_data to rabbitmq queue 'processed_data'
    channel.basic_publish(exchange='',
                      routing_key='processed_data',
                      body=json.dumps(processed_data))
    
    channel.basic_ack(delivery_tag = method.delivery_tag)


channel.basic_consume(queue='unprocessed_data', on_message_callback=process_data)

channel.start_consuming()