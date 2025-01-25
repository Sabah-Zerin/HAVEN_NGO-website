import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import './Donation.css';

const Donation = () => {
  const navigate = useNavigate();

  const handleDonate = (e) => {
    e.preventDefault(); // Prevent form submission

    // Check if the user is logged in (token stored in localStorage)
    const token = localStorage.getItem('user_token');
    if (!token) {
      // Redirect to the signup page if not logged in
      navigate('/register');
    } else {
      
      // Redirect to PaymentDetails page if logged in
      navigate('/payment-details');
    }
  };


  return (
    <>
      <Navbar />
      <div className="donation-container" style={{ backgroundImage: `url('/donation.jpg')` }}>
        <div className="donation-content">
          <h1>DONATE & HELP CHILDREN FOR EDUCATION</h1>

          <form className="donation-form" onSubmit={handleDonate}>
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
