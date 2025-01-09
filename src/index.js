// src/index.js or src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import MainApp from './App'; // Ensure this path is correct
import './index.css'; // Import global styles if any

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>
);
