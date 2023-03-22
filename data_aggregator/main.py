from prometheus_client import Gauge, generate_latest, start_http_server
import pika
import json
import time

metricsOutput = Gauge('device_health', 'Failure prediction (lower is better)', [
                      'serial_number', 'model', 'group'])

def createMetric(ch, method, properties, body):
    try:
        # json to python dict
        body_string = body.decode('utf-8')
        data = json.loads(body_string)
        serial_number = data["serial_number"]
        model = data["model"]

        # get failure rate
        failure_rate = float(data.json()['failure_prediction'])

        # assign metric to group
        group = ""
        if failure_rate >= 0.5:
            group = "critical"
        elif failure_rate < 0.5 and failure_rate >= 0.1:
            group = "risk"
        elif failure_rate < 0.1:
            group = "healthy"

        metricsOutput.labels(serial_number, model, group).set(data.json()['failure_prediction'])

        # update the gauge and show the output as text
        generate_latest(metricsOutput)
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON data: {e}")

if __name__ == '__main__':
    start_http_server(8003)

    # get data processed by ml and post it as metric
    connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
    channel = connection.channel()
    channel.queue_declare(queue='processed_data')
    channel.basic_consume(queue='processed_data', on_message_callback=createMetric, auto_ack=True)

    while True:
        try:
            channel.start_consuming()
        except KeyboardInterrupt:
            channel.stop_consuming()
            break
        except pika.exceptions.ConnectionClosedByBroker:
            time.sleep(5)
            continue
        except pika.exceptions.AMQPChannelError:
            time.sleep(5)
            continue
        except Exception as e:
            print(f"Unknown error occurred: {e}")
            break

    connection.close()