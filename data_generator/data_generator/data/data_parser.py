from data_generator.utils.utility import get_data_path
from data_generator.database.tables import HardDriveStats
from data_generator.database.datawriter import DataWriter

import multiprocessing

import csv
from datetime import datetime
from typing import List

class CSVParser:
    def __init__(self, filename: str):
        self.filename = filename
        
    def __call__(self):
        data_writer = DataWriter()
        rows = []
        with open(self.filename, "r") as csvfile:
            csvreader = csv.reader(csvfile)
            next(csvreader)  # Skip header row
            with multiprocessing.Pool(16) as pool:
                for i, row in enumerate(pool.imap(self.parse_row, csvreader)):
                    rows.append(row)
                    if i % 1000 == 0:
                        print(f"Processed {i} rows")
                        data_writer.write_multiple_rows_to_database(rows)
                        rows = []
                # Write any remaining rows to the database
                data_writer.write_multiple_rows_to_database(rows)
    
    @staticmethod
    def parse_row(row):
        return HardDriveStats(
                    date=datetime.strptime(row[0], '%Y-%m-%d').date(),
                    serial_number=row[1],
                    model=row[2],
                    capacity_bytes=row[3],
                    failure=row[4],
                    smart_1_normalized=row[5],
                    smart_1_raw=row[6],
                    smart_2_normalized=row[7],
                    smart_2_raw=row[8],
                    smart_3_normalized=row[9],
                    smart_3_raw=row[10],
                    smart_4_normalized=row[11],
                    smart_4_raw=row[12],
                    smart_5_normalized=row[13],
                    smart_5_raw=row[14],
                    smart_7_normalized=row[15],
                    smart_7_raw=row[16],
                    smart_8_normalized=row[17],
                    smart_8_raw=row[18],
                    smart_9_normalized=row[19],
                    smart_9_raw=row[20],
                    smart_10_normalized=row[21],
                    smart_10_raw=row[22],
                    smart_11_normalized=row[23],
                    smart_11_raw=row[24],
                    smart_12_normalized=row[25],
                    smart_12_raw=row[26],
                    smart_13_normalized=row[27],
                    smart_13_raw=row[28],
                    smart_15_normalized=row[29],
                    smart_15_raw=row[30],
                    smart_22_normalized=row[31],
                    smart_22_raw=row[32],
                    smart_183_normalized=row[33],
                    smart_183_raw=row[34],
                    smart_184_normalized=row[35],
                    smart_184_raw=row[36],
                    smart_187_normalized=row[37],
                    smart_187_raw=row[38],
                    smart_188_normalized=row[39],
                    smart_188_raw=row[40],
                    smart_189_normalized=row[41],
                    smart_189_raw=row[42],
                    smart_190_normalized=row[43],
                    smart_190_raw=row[44],
                    smart_191_normalized=row[45],
                    smart_191_raw=row[46],
                    smart_192_normalized=row[47],
                    smart_192_raw=row[48],
                    smart_193_normalized=row[49],
                    smart_193_raw=row[50],
                    smart_194_normalized=row[51],
                    smart_194_raw=row[52],
                    smart_195_normalized=row[53],
                    smart_195_raw=row[54],
                    smart_196_normalized=row[55],
                    smart_196_raw=row[56],
                    smart_197_normalized=row[57],
                    smart_197_raw=row[58],
                    smart_198_normalized=row[59],
                    smart_198_raw=row[60],
                    smart_199_normalized=row[61],
                    smart_199_raw=row[62],
                    smart_200_normalized=row[63],
                    smart_200_raw=row[64],
                    smart_201_normalized=row[65],
                    smart_201_raw=row[66],
                    smart_220_normalized=row[67],
                    smart_220_raw=row[68],
                    smart_222_normalized=row[69],
                    smart_222_raw=row[70],
                    smart_223_normalized=row[71],
                    smart_223_raw=row[72],
                    smart_224_normalized=row[73],
                    smart_224_raw=row[74],
                    smart_225_normalized=row[75],
                    smart_225_raw=row[76])
        
def chunks(lst, chunk_size):
    """Yield successive chunk_size chunks from lst."""
    for i in range(0, len(lst), chunk_size):
        yield lst[i:i + chunk_size]


if __name__ == "__main__":
    import os
    path = os.path.join(get_data_path(), "harddrive.csv")

    csv_parser = CSVParser(path)
    csv_parser()
