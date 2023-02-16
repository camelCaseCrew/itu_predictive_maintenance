from data_generator.data.data_parser import CSVParser
from data_generator.utils.utility import get_data_path

import os

path = os.path.join(get_data_path(), "harddrive.csv")

csv_parser = CSVParser(path)
csv_parser()

