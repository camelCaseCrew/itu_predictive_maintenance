import unittest
import psycopg2

class TestTransactions(unittest.TestCase):

    def test_addEntryToTable(self):
        connection = psycopg2.connect(database="postgres",
                        host="db",
                        user="postgres",
                        password="postgres",
                        port="5432")
        
        cursor = connection.cursor()
        cursor.execute("""
        INSERT INTO prediction_feedback
        SELECT *
        FROM hard_drive_stats
        WHERE id = 1;
        """)

        cursor.execute("SELECT COUNT(*) FROM prediction_feedback")
        count = cursor.fetchone()[0]
        self.assertFalse(count == 0, "Entry wasn't added to user feedback table")

        cursor.execute("DELETE FROM prediction_feedback")

        connection.commit()

        cursor.close()
        connection.close()

if __name__ == '__main__':
    unittest.main()