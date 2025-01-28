def preprocess_transaction(transaction, encoders):
    """
    Preprocess a single transaction for prediction.
    Args:
        transaction (dict): Input transaction details.
        encoders (dict): Label encoders for categorical variables.

    Returns:
        dict: Preprocessed transaction details.
    """
    # Apply encoders to categorical fields
    categorical_fields = ['gender', 'zipcodeOri', 'merchant', 'zipMerchant', 'category']
    for field in categorical_fields:
        if field in transaction:
            try:
                transaction[field] = encoders[field].transform([transaction[field]])[0]
            except KeyError:
                raise ValueError(f"Invalid value for field '{field}': {transaction[field]}")

    # Ensure numeric fields are in correct format
    numeric_fields = ['step', 'amount', 'age']
    for field in numeric_fields:
        if field in transaction:
            transaction[field] = float(transaction[field])

    return transaction
