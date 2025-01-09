import React from 'react';
import './App.css';

const Home = () => {
  const title = "Welcome to Parkinson's Disease Detection";
  const paragraph = "The Parkinson's Disease Detection Model is an innovative system that analyzes spiral hand drawings using Convolutional Neural Networks (CNNs) to provide a non-invasive method for early detection of Parkinson's disease, a neurodegenerative disorder affecting motor control. How It Works: Patients are asked to draw spirals on paper, and these drawings are digitized and processed by the CNN. The model analyzes features such as symmetry, smoothness, and shape irregularities, trained on a diverse dataset of drawings from both healthy individuals and those with Parkinson's disease to identify subtle variations indicating the disease. What It Does: The model classifies spiral drawings as 'Parkinson's' or 'Healthy,' providing healthcare professionals with insights and confidence scores that assist in early diagnosis and ongoing monitoring of disease progression.";

  return (
    <div className="home-container">
      {/* Title with animation */}
      <h1 className="home-title">
        {title.split(' ').map((word, index) => (
          <span key={index} className="title-word">
            {word.split('').map((letter, i) => (
              <span key={i} className="title-letter" style={{ animationDelay: `${(index * word.length + i) * 50}ms` }}>
                {letter}
              </span>
            ))}
            <span>&nbsp;</span> {/* Add space between words */}
          </span>
        ))}
      </h1>

      {/* Paragraph with animation */}
      <p className="home-paragraph">
        {paragraph.split(' ').map((word, index) => (
          <span key={index} className="paragraph-word">
            {word.split('').map((letter, i) => (
              <span key={i} className="paragraph-letter" style={{ animationDelay: `${(index * word.length + i) * 10}ms` }}> {/* Decreased delay for faster animation */}
                {letter}
              </span>
            ))}
            <span>&nbsp;</span> {/* Add space between words */}
          </span>
        ))}
      </p>
    </div>
  );
};

export default Home;
