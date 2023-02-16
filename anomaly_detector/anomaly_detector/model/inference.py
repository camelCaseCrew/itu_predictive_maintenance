import os
import torch

from sentence_transformers import SentenceTransformer

from anomaly_detector.utils.utility import get_root_path
from anomaly_detector.model.auto_encoder import AE


class Inference():
    def __init__(self) -> None:
        self.model = self._load_model()
        self.embedding_model = SentenceTransformer('paraphrase-MiniLM-L6-v2')

    def __call__(self, data):
        data = self.embedding_model.encode(data)
        prediction = self.predict(data)
        return self.mse_score(data, prediction)

    def _load_model(self, model_path: str = os.path.join(get_root_path(),"models", "model.pth")):
        model = AE()
        model.load_state_dict(torch.load(model_path, map_location=torch.device('cpu')))
        return model.eval()

    def predict(self, data):
        with torch.no_grad():
            data = torch.from_numpy(data).float()
            output = self.model(data)
            return output
        
    def mse_score(self, data, output):
        return torch.nn.MSELoss()(torch.from_numpy(data).float(), output).float().item()