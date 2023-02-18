import os
import joblib
import pandas as pd

from predictive_maintenance.utils.utility import get_root_path

class Inference:
    def __init__(self):
        self.model = joblib.load(os.path.join(get_root_path(), "models", "model.pkl"))
        
    def predict(self, data: dict):
        df = pd.DataFrame(data, index=[0])
        data = df.reindex(sorted(df.columns), axis=1)
        data.fillna(-1, inplace=True)
        return self.model.predict_proba(data)[0][1]
    
# 'capacity_bytes', 'failure', 'smart_1_normalized', 'smart_1_raw',
#        'smart_2_normalized', 'smart_2_raw', 'smart_3_normalized',
#        'smart_3_raw', 'smart_4_normalized', 'smart_4_raw',
#        'smart_5_normalized', 'smart_5_raw', 'smart_7_normalized',
#        'smart_7_raw', 'smart_8_normalized', 'smart_8_raw',
#        'smart_9_normalized', 'smart_9_raw', 'smart_10_normalized',
#        'smart_10_raw', 'smart_11_normalized', 'smart_11_raw',
#        'smart_12_normalized', 'smart_12_raw', 'smart_13_normalized',
#        'smart_13_raw', 'smart_15_normalized', 'smart_15_raw',
#        'smart_22_normalized', 'smart_22_raw', 'smart_183_normalized',
#        'smart_183_raw', 'smart_184_normalized', 'smart_184_raw',
#        'smart_187_normalized', 'smart_187_raw', 'smart_188_normalized',
#        'smart_188_raw', 'smart_189_normalized', 'smart_189_raw',
#        'smart_190_normalized', 'smart_190_raw', 'smart_191_normalized',
#        'smart_191_raw', 'smart_192_normalized', 'smart_192_raw',
#        'smart_193_normalized', 'smart_193_raw', 'smart_194_normalized',
#        'smart_194_raw', 'smart_195_normalized', 'smart_195_raw',
#        'smart_196_normalized', 'smart_196_raw', 'smart_197_normalized',
#        'smart_197_raw', 'smart_198_normalized', 'smart_198_raw',
#        'smart_199_normalized', 'smart_199_raw', 'smart_200_normalized',
#        'smart_200_raw', 'smart_201_normalized', 'smart_201_raw',
#        'smart_220_normalized', 'smart_220_raw', 'smart_222_normalized',
#        'smart_222_raw', 'smart_223_normalized', 'smart_223_raw',
#        'smart_224_normalized', 'smart_224_raw', 'smart_225_normalized',
#        'smart_225_raw', 'smart_226_normalized', 'smart_226_raw',
#        'smart_240_normalized', 'smart_240_raw', 'smart_241_normalized',
#        'smart_241_raw', 'smart_242_normalized', 'smart_242_raw',
#        'smart_250_normalized', 'smart_250_raw', 'smart_251_normalized',
#        'smart_251_raw', 'smart_252_normalized', 'smart_252_raw',
#        'smart_254_normalized', 'smart_254_raw', 'smart_255_normalized',
#        'smart_255_raw'