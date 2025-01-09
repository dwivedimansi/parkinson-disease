from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS for cross-origin requests
from tensorflow.keras.models import load_model
import numpy as np
import cv2
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the trained model
model_path = 'model/parkinson_disease_detection.h5'
if not os.path.exists(model_path):
    raise FileNotFoundError(f"Model file '{model_path}' not found.")
model = load_model(model_path)

# Define the labels
labels = ['Healthy', 'Parkinson']

@app.route('/predict', methods=['POST'])
def predict():
    # Check if the request contains an image file
    if 'image' not in request.files:
        return jsonify({'error': 'No image part in the request'}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No file selected for uploading'}), 400

    # Load the image using OpenCV
    try:
        # Read the image file into a numpy array
        file_bytes = np.frombuffer(file.read(), np.uint8)
        image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

        if image is None:
            return jsonify({'error': 'Error reading the image file'}), 400

        # Preprocess the image
        image = cv2.resize(image, (128, 128))  # Resize to match model input
        image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)  # Convert to grayscale
        image = np.expand_dims(image, axis=-1)  # Add channel dimension
        image = image / 255.0  # Normalize the pixel values
        image = np.expand_dims(image, axis=0)  # Add batch dimension
    except Exception as e:
        return jsonify({'error': f'Failed to process the image: {str(e)}'}), 500

    # Make prediction
    try:
        prediction = model.predict(image)
        predicted_label = labels[np.argmax(prediction)]
        confidence = float(np.max(prediction))

        return jsonify({
            'prediction': predicted_label,
            'confidence': confidence
        })
    except Exception as e:
        return jsonify({'error': f'Error during prediction: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True)
