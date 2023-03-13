import os
import joblib
import pandas as pd
import imblearn

from sklearn.model_selection import train_test_split
from sklearn.ensemble import HistGradientBoostingClassifier

from predictive_maintenance.utils.utility import get_data_path, get_root_path

def load_data():
    data_path = get_data_path()
    data = pd.read_csv(os.path.join(data_path, "harddrive.csv"))
    data.drop(["serial_number", "date", "model"], axis=1, inplace=True)
    # replace NaN with -1
    data.fillna(-1, inplace=True)
    return data

def split_data(data):
    X = data.drop("failure", axis=1)
    X = X.reindex(sorted(X.columns), axis=1)
    y = data["failure"]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    # Fix imbalanced data
    oversample = imblearn.over_sampling.SMOTE()
    X_train, y_train = oversample.fit_resample(X_train, y_train)

    return X_train, X_test, y_train, y_test

def train_model():
    data = load_data()
    X_train, X_test, y_train, y_test = split_data(data)
    model = HistGradientBoostingClassifier()
    model.fit(X_train, y_train)
    evaluate_model(model, X_test, y_test)
    return model

def evaluate_model(model, X_test, y_test):
    accuracy = model.score(X_test, y_test)
    print("Accuracy: {:.2f}%".format(accuracy * 100))

def save_model(model):
    save_path = os.path.join(get_root_path(), "models", "model.pkl")
    joblib.dump(model, save_path)

if __name__ == "__main__":
    model = train_model()
    save_model(model)
