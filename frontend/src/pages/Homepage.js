import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';

const Homepage = () => {
  return (
    <div className="homepage">
      {/* Navigation Bar */}
      <nav className="nav-bar">
        <div className="logo-container">
          <img src="/favicon.ico" className="logo" alt="Haven Logo" />
        </div>
        <div className="nav-links">
          <Link to="/campaigns">Campaigns</Link>
          <Link to="/about">About Us</Link>
          <Link to="/login">LogIn/Reg</Link>
          <Link to="/contact">Contact Us</Link>
        </div>
      </nav>

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
          <button>Donate Now</button>
        </div>
        <div className="campaign">
          <img src="/home_3.jpg" alt="Campaign 2" />
          <button>Donate Now</button>
        </div>
        <div className="campaign">
          <img src="/home_4.jpg" alt="Campaign 3" />
          <button>Donate Now</button>
        </div>
        <div className="campaign">
          <img src="/home_5.jpg" alt="Campaign 4" />
          <button>Donate Now</button>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
