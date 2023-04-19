import pika, unittest, json, time
from sample import sample

class TestTransactions(unittest.TestCase):
        
    def test_messageIsTakenFromUnprocessedAndEndsUpInProcessed(self):
        # Arrange
        connection = pika.BlockingConnection(pika.ConnectionParameters("rabbitmq"))
        channel = connection.channel()
    
        def callback(ch, method, properties, body):
            # Assert
            self.assertTrue(True)
            channel.stop_consuming()

        # Act        
        channel.queue_declare(queue='unprocessed_data')
        channel.queue_declare(queue='processed_data')
        channel.basic_publish(exchange='', routing_key='unprocessed_data', body=sample)
        channel.basic_consume(queue='processed_data', on_message_callback=callback, auto_ack=True)
        channel.start_consuming()

        connection.close()

    def test_deserializedMessagesContainExpectedKeys(self):
            # Arrange
            connection = pika.BlockingConnection(pika.ConnectionParameters("rabbitmq"))
            channel = connection.channel()

            def callback(ch, method, properties, body):
                # Assert
                body_string = body.decode('utf-8')
                body_deserialized = json.loads(body_string)
                self.assertTrue('serial_number' in body_deserialized, "Serial number is not in body")
                self.assertTrue('model' in body_deserialized, "model is not in body")
                self.assertTrue('capacity_bytes' in body_deserialized, "capacity_bytes is not in body")
                self.assertTrue('date' in body_deserialized, "date is not in body")
                self.assertTrue('device_type' in body_deserialized, "device_type is not in body")
                self.assertTrue('failure_prediction' in body_deserialized, "failure_prediction is not in body")
                # SMART parameters no longer relevant, shouldnt be in body
                self.assertFalse('smart_1_normalized' in body_deserialized, "smart_1_normalized is unexpectedly in body")
                self.assertFalse('smart_1_raw' in body_deserialized, "smart_1_raw is unexpectedly in body")
                self.assertFalse('smart_7_normalized' in body_deserialized, "smart_7_normalized is unexpectedly in body")
                self.assertFalse('smart_7_raw' in body_deserialized, "smart_7_raw is unexpectedly in body")
                self.assertFalse('smart_193_normalized' in body_deserialized, "smart_193_normalized is unexpectedly in body")
                self.assertFalse('smart_193_raw' in body_deserialized, "smart_193_raw is unexpectedly in body")
                self.assertFalse('smart_220_normalized' in body_deserialized, "smart_220_normalized is unexpectedly in body")
                self.assertFalse('smart_220_raw' in body_deserialized, "smart_220_raw is unexpectedly in body")
                channel.stop_consuming()

            # Act
            channel.queue_declare(queue='unprocessed_data')
            channel.queue_declare(queue='processed_data')
            channel.basic_publish(exchange='', routing_key='unprocessed_data', body=sample)
            channel.basic_consume(queue='processed_data', on_message_callback=callback, auto_ack=True)
            channel.start_consuming()

            connection.close()
    
    def test_multipleMessagesAreTakenFromUnprocessedAndEndUpInProcessed(self):
            # Arrange
            connection = pika.BlockingConnection(pika.ConnectionParameters("rabbitmq"))
            channel = connection.channel()
            total_messages = 20

            # Act
            channel.queue_declare(queue='unprocessed_data')
            channel.queue_declare(queue='processed_data')
            for _ in range(total_messages):
                channel.basic_publish(exchange='', routing_key='unprocessed_data', body=sample)

            # Loop until amount of delivered messages reach amount sent into unprocessed
            for method_frame, properties, body in channel.consume('processed_data'):
                channel.basic_ack(method_frame.delivery_tag)

                if method_frame.delivery_tag == total_messages:
                    self.assertTrue(True)
                    break

            connection.close()

if __name__ == '__main__':
    unittest.main()