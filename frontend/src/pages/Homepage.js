import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';

const Homepage = () => {
  const navigate = useNavigate();

  const handleDonateClick = () => {
    navigate('/donation');
  };

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Haven</h1>
          <p>Empowering communities, transforming lives. Together, we make a difference.</p>
          <button onClick={handleDonateClick} className="donate-button">Donate Now</button>
        </div>
        <img src="/home_1.jpg" alt="Campaign Banner" className="hero-image" />
      </section>

      {/* Campaigns Section */}
      <section className="campaigns">
        <h2>Our Recent Campaigns</h2>
        <div className="campaign-list">
          <div className="campaign">
            <img src="/home_2.jpg" alt="Campaign 1" />
            <button onClick={handleDonateClick} className="donate-button">Donate Now</button>
          </div>
          <div className="campaign">
            <img src="/home_3.jpg" alt="Campaign 2" />
            <button onClick={handleDonateClick} className="donate-button">Donate Now</button>
          </div>
          <div className="campaign">
            <img src="/home_4.jpg" alt="Campaign 3" />
            <button onClick={handleDonateClick} className="donate-button">Donate Now</button>
          </div>
          <div className="campaign">
            <img src="/home_5.jpg" alt="Campaign 4" />
            <button onClick={handleDonateClick} className="donate-button">Donate Now</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
