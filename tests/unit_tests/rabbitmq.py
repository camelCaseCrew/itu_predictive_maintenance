import pika, unittest

class TestConnection(unittest.TestCase):

    def creatingConnectionReturnsBlockingConnection(self):
        # Arrange & Act
        connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
        

        # Assert
        self.assertTrue(isinstance(connection, pika.BlockingConnection))
    

class TestTransactions(unittest.TestCase):

    def producingMessageReturnsEchoesMessageSent(self):
        # Arrange
        connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
        channel = connection.channel()
        message = "test"

        # Act
        channel.queue_declare(queue='test_queue')
        

        # Assert
        self.assertIsNone(channel.basic_publish(exchange='', routing_key='test_queue', body=message))




if __name__ == '__main__':
    unittest.main()