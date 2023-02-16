from sqlalchemy import func
from sqlmodel import Session, select

from data_generator.database.tables import HardDrivesStats
from data_generator.utils.sql_utils import get_database_engine

class DataLoader():
    def __init__(self):
        self.engine = get_database_engine()
    
    def get_all_records(self):
        with Session(self.engine) as session:
            statement = select(HardDrivesStats)
            result = session.exec(statement).all()
            return result
        
    def get_count(self):
        with Session(self.engine) as session:
            statement = select(func.count(HardDrivesStats.id))
            result = session.exec(statement).one()
            return result
        
    def get_ids(self):
        with Session(self.engine) as session:
            statement = select(HardDrivesStats.id)
            result = session.exec(statement).all()
            return result
        
    def get_log_message(self, log_id: int):
        with Session(self.engine) as session:
            statement = select(HardDrivesStats).where(HardDrivesStats.id == log_id)
            result = session.exec(statement).one()
            return result