from sqlmodel import Session, delete
from sqlmodel import create_engine

from anomaly_detector.utils.utility import get_env_variables
from anomaly_detector.database.tables import Logs

def get_database_connection_string():
    env = get_env_variables()
    hostname = env["DATABASE_HOST"]
    port = env["DATABASE_PORT"]
    database = env["DATABASE_NAME"]
    username = env["DATABASE_USERNAME"]
    password = env["DATABASE_PASSWORD"]
    
    connection_string = f"postgresql+psycopg2://{username}:{password}@{hostname}:{port}/{database}"
    return connection_string

def get_database_engine():
    connection_string = get_database_connection_string()
    engine = create_engine(connection_string)
    return engine

def empty_database_tables():
    engine = get_database_engine()
    with Session(engine) as session:
        delete_table = delete(Logs)
        session.exec(delete_table)
        session.commit()
    