import pika, unittest, json, time, requests
from sample import sample

class TestTransactions(unittest.TestCase):
    def test_processedMessageIsAggregated(self):
        # Arrange
        connection = pika.BlockingConnection(pika.ConnectionParameters("rabbitmq"))
        channel = connection.channel()

        # Act
        channel.queue_declare(queue='processed_data')
        channel.basic_publish(exchange='', routing_key='processed_data', body=sample)
        connection.close()
        time.sleep(5)

        # check that device health metric has been updated
        r = requests.get("http://data_aggregator:8003/metrics")
        body = r.text
        self.assertTrue('device_health' in body, "Device health is not in body")
        self.assertTrue('model="ST4000DM000"' in body, "Correct model is not in body")
        self.assertTrue('serial_number="Z304KBXS"' in body, "Correct serial number is not in body")
        self.assertTrue('6.220004126975216e-05' in body, "Correct failure prediction is not in body")
        self.assertTrue('device_type="harddrive"' in body, "Correct device type is not in body")

if __name__ == '__main__':
    unittest.main()