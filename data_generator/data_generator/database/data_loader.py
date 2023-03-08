from sqlalchemy import func
from sqlmodel import Session, select

from data_generator.database.tables import HardDriveStats
from data_generator.utils.sql_utils import get_database_engine

class DataLoader():
    def __init__(self):
        self.engine = get_database_engine()

    def get_all_records(self):
        with Session(self.engine) as session:
            statement = select(HardDriveStats)
            result = session.exec(statement).all()
            return result

    def get_count(self):
        with Session(self.engine) as session:
            statement = select(func.count(HardDriveStats.id))
            result = session.exec(statement).one()
            return result

    def get_ids(self):
        with Session(self.engine) as session:
            statement = select(HardDriveStats.id)
            result = session.exec(statement).all()
            return result

    def get_failure_ids(self):
        with Session(self.engine) as session:
            statement = select(HardDriveStats.id).where(HardDriveStats.failure == 1)
            result = session.exec(statement).all()
            return result

    def get_record(self, id):
        with Session(self.engine) as session:
            statement = select(HardDriveStats).where(HardDriveStats.id == id)
            result = session.exec(statement).one().dict()
            #remove_keys = ["failure", "model", "serial_number", "date", "id"]
            #for key in remove_keys: del result[key]
            return result
