import pika, sys, os, unittest

class TestConnection(unittest.TestCase):

    def creatingConnectionReturnsBlockingConnection(self):
        # Arrange & Act
        connection = pika.BlockingConnection(pika.ConnectionParameters(host='localhost'))
        

        # Assert
        self.assertTrue(isinstance(connection, pika.BlockingConnection))


if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print('Interrupted')
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)