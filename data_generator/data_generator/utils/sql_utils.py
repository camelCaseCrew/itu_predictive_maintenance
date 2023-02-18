from sqlmodel import Session, delete
from sqlmodel import create_engine

from data_generator.utils.utility import get_env_variables
from data_generator.utils.logger import Logger

_logger = Logger().get_logger()

def get_database_connection_string():
    env = get_env_variables()
    hostname = env["DATABASE_HOST"]
    port = env["DATABASE_PORT"]
    database = env["DATABASE_NAME"]
    username = env["DATABASE_USERNAME"]
    password = env["DATABASE_PASSWORD"]
    _logger.info(f"Connecting to database: {hostname}:{port}/{database}")
    connection_string = f"postgresql+psycopg2://{username}:{password}@{hostname}:{port}/{database}"
    return connection_string

def get_database_engine():
    connection_string = get_database_connection_string()
    engine = create_engine(connection_string)
    return engine
