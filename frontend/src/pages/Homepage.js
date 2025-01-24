import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import './Homepage.css';

const Homepage = () => {
  const navigate = useNavigate();

  const handleDonateClick = () => {
    navigate('/donation');
  };

  return (
    <div className="homepage">
      <Navbar />
      {/* Hero Section */}
      <section className="hero">
        <h2>Empowering communities, transforming lives. Together, we make a difference.</h2>
        <img src="/home_1.jpg" alt="Campaign Banner" className="hero-image" />
        <p className="hero-subtext"><i>Some of our recent campaigns</i></p>
      </section>

      {/* Campaign Section */}
      <section className="campaigns">
        <div className="campaign">
          <img src="/home_2.jpg" alt="Campaign 1" />
          <button onClick={handleDonateClick}>Donate Now</button>
        </div>
        <div className="campaign">
          <img src="/home_3.jpg" alt="Campaign 2" />
          <button onClick={handleDonateClick}>Donate Now</button>
        </div>
        <div className="campaign">
          <img src="/home_4.jpg" alt="Campaign 3" />
          <button onClick={handleDonateClick}>Donate Now</button>
        </div>
        <div className="campaign">
          <img src="/home_5.jpg" alt="Campaign 4" />
          <button onClick={handleDonateClick}>Donate Now</button>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
