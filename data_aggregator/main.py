from time import sleep
from prometheus_client import Gauge, generate_latest, start_http_server

metricsOutput = Gauge('device_health', 'Failure prediction (lower is better)', [
                      'serial_number', 'model', 'group'])


if __name__ == '__main__':
    start_http_server(8003)
    while(True):
        sleep(1)
    """
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
    generate_latest(metricsOutput)
    """