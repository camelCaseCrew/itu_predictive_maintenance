import torch
import torch.nn as nn
import torch.optim as optim

class AE(nn.Module):
    def __init__(self):
        super().__init__()
        self.encoder = nn.Sequential(
            nn.Linear(384, 192),
            nn.ReLU(),
            nn.Linear(192, 96),
        )
        self.decoder = nn.Sequential(
            nn.Linear(96, 192),
            nn.ReLU(),
            nn.Linear(192, 384),
        )

    def encode(self, x):
        x = self.encoder(x)
        return x

    def decode(self, x):
        x = self.decoder(x)
        return x

    def forward(self, x):
        x = self.encode(x)
        x = self.decode(x)
        return x
