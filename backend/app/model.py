import joblib
import numpy as np

def load_model():
    """
    Load the pre-trained model and label encoders.
    """
    model_path = 'backend/Models/fraud_model.pkl'
    encoders_path = 'backend/Models/label_encoders.pkl'

    # Load the model
    model = joblib.load(model_path)
    encoders = joblib.load(encoders_path)

    return model, encoders

def predict_fraud(transaction, model, encoders):
    """
    Predict whether a transaction is fraudulent or not.
    Args:
        transaction (dict): Input transaction details.
        model: Trained ML model.
        encoders: Label encoders for categorical variables.

    Returns:
        int: 1 if fraud, 0 otherwise.
    """
    # Preprocess transaction data
    from utils import preprocess_transaction
    transaction_processed = preprocess_transaction(transaction, encoders)

    # Extract features for prediction
    features = np.array([transaction_processed[col] for col in [
        'step', 'age', 'gender', 'zipcodeOri', 'merchant', 
        'zipMerchant', 'category', 'amount'
    ]])

    # Make prediction
    return model.predict([features])[0]
