// src/Prediction.js
import React, { useState } from 'react';
import axios from 'axios';
import predictionGif from './assets/prediction.gif'; // Renamed for clarity
import './App.css';

const Prediction = () => {
  const [selectedFile, setSelectedFile] = useState(null); // State for selected file
  const [prediction, setPrediction] = useState(''); // State for prediction result
  const [confidence, setConfidence] = useState(''); // State for confidence level
  const [loading, setLoading] = useState(false); // State for loading status

  // Handle file input change
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Upload image and get prediction
  const uploadImage = async () => {
    if (!selectedFile) {
      alert('Please select an image!');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      setLoading(true);
      const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const { prediction: pred, confidence: conf, error } = response.data;
      setPrediction(error ? `Error: ${error}` : `Prediction: ${pred}`);
      setConfidence(error ? '' : `Confidence: ${(conf * 100).toFixed(2)}%`);
    } catch (err) {
      setPrediction(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="prediction-page">
      <img src={predictionGif} alt="Background GIF" className="background-gif" />
      <h1 className="title">Parkinson's Disease Detection</h1> {/* Title at the top */}
      <div className="main-card">
        <div className="upload-form">
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button className="upload-button" onClick={uploadImage} disabled={loading}>
            {loading ? 'Uploading...' : 'Upload and Predict'}
          </button>
        </div>
        <div className="output">
          <p className={`prediction ${loading ? 'fade-out' : 'fade-in'}`}>{prediction}</p>
          <p className={`confidence ${loading ? 'fade-out' : 'fade-in'}`}>{confidence}</p>
        </div>
      </div>
    </div>
  );
};

export default Prediction;
