from sqlalchemy import func
from sqlmodel import Session, select

from anomaly_detector.database.tables import Logs
from anomaly_detector.utils.sql_utils import get_database_engine

class DataLoader():
    def __init__(self):
        self.engine = get_database_engine()
    
    def get_all_records(self):
        with Session(self.engine) as session:
            statement = select(Logs)
            result = session.exec(statement).all()
            return result
        
    def get_count(self):
        with Session(self.engine) as session:
            statement = select(func.count(Logs.id))
            result = session.exec(statement).one()
            return result
        
    def get_ids(self):
        with Session(self.engine) as session:
            statement = select(Logs.id)
            result = session.exec(statement).all()
            return result
        
    def get_log_message(self, log_id: int):
        with Session(self.engine) as session:
            statement = select(Logs).where(Logs.id == log_id)
            result = session.exec(statement).one()
            return result