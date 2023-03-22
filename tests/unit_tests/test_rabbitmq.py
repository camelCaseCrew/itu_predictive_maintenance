import pika, unittest

class TestConnection(unittest.TestCase):

    def test_creatingConnectionReturnsBlockingConnection(self):
        # Arrange & Act
        connection = pika.BlockingConnection(pika.ConnectionParameters(host='rabbitmq'))
        

        # Assert
        self.assertTrue(isinstance(connection, pika.BlockingConnection))

        connection.close()

    

class TestTransactions(unittest.TestCase):

    def test_producingMessageDoesNotRaiseException(self):
        # Arrange
        connection = pika.BlockingConnection(pika.ConnectionParameters(host='rabbitmq'))
        channel = connection.channel()
        message = "test"

        # Act
        channel.queue_declare(queue='test_queue')
        

        # Assert
        try:
            channel.basic_publish(exchange='', routing_key='test_queue', body=message)
        except Exception:
            self.assertTrue(False, 'Exception Raised')
        
        connection.close()

        
    def test_consumingMessageReturnsExpectedMessage(self):
        # Arrange
        connection = pika.BlockingConnection(pika.ConnectionParameters(host='rabbitmq'))
        channel = connection.channel()
        expected_message = 'expected this message :D'

        def callback(ch, method, properties, body):
            # Assert
            self.assertEqual(expected_message, body)

        # Act
        channel.queue_declare(queue='test_queue')
        channel.basic_publish(exchange='', routing_key='test_queue', body=expected_message)
        channel.basic_consume(queue='test_queue', on_message_callback=callback, auto_ack=True)

        connection.close()


if __name__ == '__main__':
    unittest.main()