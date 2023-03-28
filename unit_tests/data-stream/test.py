import pika, unittest, json, time
from unittest.mock import Mock

class TestTransactions(unittest.TestCase):
        
    def test_unprocessedMessagesAreInsertedIntoRabbitMQ(self):
        # Arrange
        connection = pika.BlockingConnection(pika.ConnectionParameters("rabbitmq"))
        channel = connection.channel()
    
        def callback(ch, method, properties, body):
            # Assert
            self.assertTrue(True)
            channel.stop_consuming()

        # Act
        channel.queue_declare(queue='unprocessed_data')
        channel.basic_consume(queue='unprocessed_data', on_message_callback=callback, auto_ack=True)
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
                self.assertTrue('date' in body_deserialized), "date is not in body"
                # SMART parameters to test for were chosen arbitrarily
                self.assertTrue('smart_1_normalized' in body_deserialized, "smart_1_normalized is not in body")
                self.assertTrue('smart_1_raw' in body_deserialized, "smart_1_raw is not in body")
                self.assertTrue('smart_7_normalized' in body_deserialized, "smart_7_normalized is not in body")
                self.assertTrue('smart_7_raw' in body_deserialized, "smart_7_raw is not in body")
                self.assertTrue('smart_193_normalized' in body_deserialized, "smart_193_normalized is not in body")
                self.assertTrue('smart_193_raw' in body_deserialized, "smart_193_raw is not in body")
                self.assertTrue('smart_220_normalized' in body_deserialized, "smart_220_normalized is not in body")
                self.assertTrue('smart_220_raw' in body_deserialized, "smart_220_raw is not in body")
                # There shouln't be a failure key in the unprocessed data
                self.assertFalse('failure' in body_deserialized, "failure is unexpectedly in body")
                channel.stop_consuming()

            # Act
            channel.queue_declare(queue='unprocessed_data')
            channel.basic_consume(queue='unprocessed_data', on_message_callback=callback, auto_ack=True)
            channel.start_consuming()

            connection.close()
    
    def test_deserializedMessageAmountMatchesWithFrequency(self):
            # Arrange
            connection = pika.BlockingConnection(pika.ConnectionParameters("rabbitmq"))
            channel = connection.channel()
            frequency = 1000 # This corresponds to 'medium_throughput'

            # Act
            channel.queue_declare(queue='unprocessed_data')
            channel.queue_purge(queue='unprocessed_data')
            start_time = time.time()

            # Loop until amount of delivered messages reach frequency (i.e. amount of messages in 60 seconds)
            for method_frame, properties, body in channel.consume('unprocessed_data'):
                channel.basic_ack(method_frame.delivery_tag)

                if method_frame.delivery_tag == frequency:
                    break

            stop_time = time.time()
            total_time = stop_time - start_time
            self.assertAlmostEqual(total_time, 60, None, "Total time was not 10 seconds from 1 minute", 10)

            connection.close()

if __name__ == '__main__':
    unittest.main()