import os
import torch

from anomaly_detector.model.auto_encoder import AE
from anomaly_detector.model.dataset import LogDataset
from anomaly_detector.database.data_loader import DataLoader
from anomaly_detector.utils.utility import get_root_path

def get_data_loader(batch_size):
    data_loader = DataLoader()
    records = data_loader.get_all_records()
    data = [x.log_message for x in records]
    #limit data to the first 80% of the data
    data = data[:int(len(data) * 0.8)]
    dataset = LogDataset(data)
    return torch.utils.data.DataLoader(dataset, batch_size=batch_size, shuffle=True)

def train():
    batch_size = 32
    num_epochs = 5
    learning_rate = 1e-3
    
    #  use gpu if available
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print("Using device: ", device)

    data_loader = get_data_loader(batch_size)
    model = AE().to(device)
    criterion = torch.nn.MSELoss()
    optimizer = torch.optim.Adam(model.parameters(), lr=learning_rate, weight_decay=1e-5)

    print("Starting training...")
    for epoch in range(num_epochs):
        for e, data in enumerate(data_loader):
            # ===================forward=====================
            output = model(data.to(device))
            loss = criterion(output, data.to(device))
            # ===================backward====================
            optimizer.zero_grad()
            loss.backward()
            optimizer.step()
            if e % 50 == 0:
                print("loss: ", loss.item())
        # ===================log========================
        print('epoch [{}/{}], loss:{:.4f}'.format(epoch + 1, num_epochs, loss.item()))
        # ===================save========================
        torch.save(model.state_dict(), os.path.join(get_root_path(), "models", "model.pth"))
        
        
if __name__ == "__main__":
    train()