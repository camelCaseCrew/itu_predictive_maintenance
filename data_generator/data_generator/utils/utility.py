import os

from pathlib import Path
from dotenv import dotenv_values


def get_root_path():
    """Get the root path of the project"""
    root_path = Path(os.path.abspath(__file__)).parent.parent.parent
    return root_path

def get_data_path():
    """Get the data path of the project"""
    data_path = os.path.join(get_root_path(), "data")
    return data_path

def get_env_variables():
    root = get_root_path()
    config = {
    **dotenv_values(os.path.join(root, ".env")),  # load shared development variables
    **os.environ,  # override loaded values with environment variables
    }
    return config