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
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay">
          <div className="container text-center">
            <h1 className="display-4 text-black">Welcome to Haven</h1>
            <p className="lead text-black">
              Empowering communities, transforming lives. Together, we make a difference.
            </p>
            <button onClick={handleDonateClick} className="btn btn-primary btn-lg">
              Donate Now
            </button>
          </div>
        </div>
      </section>

      {/* Campaigns Section */}
      <section className="campaigns-section py-5">
        <div className="container">
          <h2 className="mb-4 text-center">Our Recent Campaigns</h2>
          <div className="row">
            <div className="col-md-3 mb-4">
              <div className="card">
                <img src="/home_2.jpg" className="card-img-top" alt="Campaign 1" />
                <div className="card-body text-center">
                  <button onClick={handleDonateClick} className="btn btn-outline-primary">
                    Donate Now
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card">
                <img src="/home_3.jpg" className="card-img-top" alt="Campaign 2" />
                <div className="card-body text-center">
                  <button onClick={handleDonateClick} className="btn btn-outline-primary">
                    Donate Now
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card">
                <img src="/home_4.jpg" className="card-img-top" alt="Campaign 3" />
                <div className="card-body text-center">
                  <button onClick={handleDonateClick} className="btn btn-outline-primary">
                    Donate Now
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-3 mb-4">
              <div className="card">
                <img src="/home_5.jpg" className="card-img-top" alt="Campaign 4" />
                <div className="card-body text-center">
                  <button onClick={handleDonateClick} className="btn btn-outline-primary">
                    Donate Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
