import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import './PaymentDetails.css'; // Create a CSS file for styling

const PaymentDetails = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <>
      <Navbar />
      <div className="payment-container">
        <div className="payment-box">
          <h2>Choose a Payment Method</h2>
          <div className="payment-options">
            <img src="/bkash.png" alt="Bkash" />
            <img src="/nogod.png" alt="Nogod" />
            <img src="/rocket.png" alt="Rocket" />
          </div>
          <button className="back-button" onClick={handleBack}>
            Back
          </button>
        </div>
      </div>
    </>
  );
};

export default PaymentDetails;
