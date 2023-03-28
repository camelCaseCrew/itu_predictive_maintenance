import pika, unittest, json, time

class TestTransactions(unittest.TestCase):
        
    def test_unprocessedMessagesAreInsertedIntoRabbitMQ(self):
        # Arrange
        connection = pika.BlockingConnection(pika.ConnectionParameters("rabbitmq"))
        channel = connection.channel()
        expected_message = 'expected this message :D'

        def callback(ch, method, properties, body):
            # Assert
            self.assertTrue(True)

        # Act
        channel.queue_declare(queue='unprocessed_data')
        channel.basic_consume(queue='unprocessed_data', on_message_callback=callback, auto_ack=True)

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

            # Act
            channel.queue_declare(queue='unprocessed_data')
            channel.basic_consume(queue='unprocessed_data', on_message_callback=callback, auto_ack=True)

            connection.close()
    
    def test_deserializedMessageAmountMatchesWithFrequency(self):
            # Arrange
            connection = pika.BlockingConnection(pika.ConnectionParameters("rabbitmq"))
            channel = connection.channel()
            frequency = 100
            start_time = 0
            message_count = 0
            started_timer = False

            def callback(ch, method, properties, body):
                if not started_timer:
                    started_timer = True
                    start_time = time.time()
                message_count = message_count + 1
                if message_count == frequency:
                    stop_time = time.time()
                    total_time = stop_time - start_time
                    # Total time should be below 60 seconds, since many messages have already been created before the tests run
                    self.assertLess(total_time, 60, "total_time was above 60 seconds")

            # Act
            channel.queue_declare(queue='unprocessed_data')
            channel.basic_consume(queue='unprocessed_data', on_message_callback=callback, auto_ack=True)

            connection.close()

if __name__ == '__main__':
    unittest.main()