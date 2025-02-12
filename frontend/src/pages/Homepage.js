import React from "react";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";

const Homepage = () => {
  const navigate = useNavigate();

  const handleDonateClick = () => {
    navigate("/donation");
  };

  return (
    <div className="homepage">
      {/* Introduction Section */}
      <section className="intro-section">
        <div className="intro-overlay">
          <img src="/home_1.jpg" alt="Introduction Banner" className="intro-placeholder" />
          <p className="intro-text">Empowering communities, transforming lives. Together, we make a difference.</p>
        </div>
      </section>

      {/* Campaigns Section */}
      <section className="campaigns-section">
        <p className="campaigns-title"><i>Some of our recent campaigns</i></p>
        <div className="campaigns-container">
          {[...Array(4)].map((_, index) => (
            <div className="campaign" key={index}>
              <img src={`/home_${index + 2}.jpg`} alt={`Campaign ${index + 1}`} />
              <button onClick={handleDonateClick} className="donate-btn">Donate Now</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Homepage;
