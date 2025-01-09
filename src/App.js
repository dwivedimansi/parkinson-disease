// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Home from './Home';
import About from './About';
import './App.css';
import prediction from './assets/prediction.gif';

// Prediction component
const Prediction = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [predictionResult, setPredictionResult] = useState('');
  const [confidence, setConfidence] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

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

      const { prediction, confidence, error } = response.data;
      setPredictionResult(error ? `Error: ${error}` : `Prediction: ${prediction}`);
      setConfidence(error ? '' : `Confidence: ${(confidence * 100).toFixed(2)}%`);
    } catch (err) {
      setPredictionResult(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="prediction-page">
      <img src={prediction} alt="Background GIF" className="background-gif" />
      <h1 className="title">Parkinson's Disease Detection</h1> {/* Title here */}
      <div className="main-card">
        <div className="upload-form">
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button className="upload-button" onClick={uploadImage} disabled={loading}>
            {loading ? 'Uploading...' : 'Upload and Predict'}
          </button>
        </div>
        <div className="output">
          <p className={`prediction ${loading ? 'fade-out' : 'fade-in'}`}>{predictionResult}</p>
          <p className={`confidence ${loading ? 'fade-out' : 'fade-in'}`}>{confidence}</p>
        </div>
      </div>
    </div>
  );
};

// App component
const App = () => {
  const location = useLocation();

  // Determine background class based on current route
  const backgroundClass = () => {
    switch (location.pathname) {
      case '/':
        return 'home-background';
      case '/prediction':
        return 'prediction-background';
      case '/about':
        return 'about-background';
      default:
        return '';
    }
  };

  return (
    <div className={`container ${backgroundClass()}`}>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/prediction">Prediction</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prediction" element={<Prediction />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};

// MainApp component without Router
const MainApp = () => (
  <Router>
    <App />
  </Router>
);

export default MainApp;
