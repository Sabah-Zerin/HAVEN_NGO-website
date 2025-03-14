import React from "react";
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      {/* Left Section - Image */}
      <div className="about-left">
        <img src="/home_3.jpg" alt="Campaign 2" className="about-image" />
      </div>

      {/* Right Section - About Content */}
      <div className="about-right">
        <h1 className="about-title">ABOUT US</h1>
        <p className="about-description">
          Welcome to <span className="about-highlight">Haven</span> where compassion meets action. We are a non-profit organization
          dedicated to making a meaningful impact in the lives of humans who need help and the communities that care for them.
        </p>
      </div>
    </div>
  );
};

export default About;