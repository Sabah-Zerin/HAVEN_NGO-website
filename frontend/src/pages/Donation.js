import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import './Donation.css';

const Donation = () => {
  const navigate = useNavigate();

  const handlePayment = (e) => {
    e.preventDefault(); // Prevent form submission
    navigate('/payment-details'); // Navigate to PaymentDetails page
  };

  return (
    <>
      <Navbar />
      <div className="donation-container" style={{ backgroundImage: `url('/donation.jpg')` }}>
        <div className="donation-content">
          <h1>DONATE & HELP CHILDREN FOR EDUCATION</h1>

          <form className="donation-form" onSubmit={handlePayment}>
            <h2>DONATE NOW</h2>
            <input type="text" placeholder="Name" required />
            <input type="email" placeholder="Email" required />
            <input type="date" placeholder="Date" required />
            <button type="submit">PAY NOW</button>
          </form>
        </div>
        <section className="about-section">
          <h2>WHO WE ARE</h2>
          <p>
            At the Lorem Ipsum generators, we are committed to helping communities worldwide.
            Your donation empowers children with education and ensures a brighter future.
          </p>
        </section>
      </div>
    </>
  );
};

export default Donation;
