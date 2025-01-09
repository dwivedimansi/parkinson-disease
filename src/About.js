// src/About.js
import React from 'react';
import dev1 from './assets/dev1.jpg'; // Replace with actual paths
import dev2 from './assets/dev2.jpg';
import dev3 from './assets/dev3.jpg';
import dev4 from './assets/dev4.jpg';

const About = () => {
  return (
    <div className="about">
      <h2 className="animated-title">Meet the Developers</h2>
      <div className="team">
        <div className="team-member">
          <img src={dev1} alt="Developer 1" />
          <p>Mansi Dwivedi</p>
        </div>
        <div className="team-member">
          <img src={dev2} alt="Developer 2" />
          <p>KJ Poojitha

           
          </p>
        </div>
        <div className="team-member">
          <img src={dev3} alt="Developer 3" />
          <p> Kirti Shetty

            
          </p>
        </div>
        <div className="team-member">
          <img src={dev4} alt="Developer 4" />
          <p>M. Navyashree

            
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
