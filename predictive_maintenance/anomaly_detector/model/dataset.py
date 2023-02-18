import torch
from torch.utils.data import Dataset
from sentence_transformers import SentenceTransformer

class LogDataset(Dataset):
    def __init__(self, data):
        self.data = data
        self.model = SentenceTransformer('paraphrase-MiniLM-L6-v2')

    def __len__(self):
        return len(self.data)

    def __getitem__(self, idx):
        return self.model.encode(self.data[idx])