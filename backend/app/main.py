from flask import Flask, request, jsonify
from model import load_model, predict_fraud

# Create Flask app
app = Flask(__name__)

# Load the model and encoders when the app starts
model, encoders = load_model()

@app.route('/')
def home():
    return "Flask server is running!"

@app.route('/predict', methods=['POST'])
def predict():
    """
    Endpoint to predict fraud.
    Accepts JSON data for transaction details.
    """
    try:
        # Parse input data from the request
        data = request.get_json()
        prediction = predict_fraud(data, model, encoders)
        return jsonify({"fraud": bool(prediction)})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)



