import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PaymentStatus.css';

const PaymentDetails = () => {
  const navigate = useNavigate();
  const [cardInfo, setCardInfo] = useState({
    name: '',
    number: '',
    expiry: '',
    cvc: ''
  });

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const paymentData = JSON.parse(localStorage.getItem('paymentData'));
      const response = await axios.post(
        'http://localhost:8000/api/payment-init',
        paymentData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('user_token')}`
          }
        }
      );
      window.location.href = response.data.payment_url;
    } catch (error) {
      navigate('/payment-fail');
    }
  };

  return (
    <div className="payment-details-container">
      <div className="payment-card">
        <h2>Enter Card Details</h2>
        <form onSubmit={handlePayment}>
          <input
            type="text"
            placeholder="Cardholder Name"
            value={cardInfo.name}
            onChange={(e) => setCardInfo({...cardInfo, name: e.target.value})}
            required
          />
          <input
            type="text"
            placeholder="Card Number"
            value={cardInfo.number}
            onChange={(e) => setCardInfo({...cardInfo, number: e.target.value})}
            pattern="\d{16}"
            required
          />
          <div className="row">
            <input
              type="text"
              placeholder="MM/YY"
              value={cardInfo.expiry}
              onChange={(e) => setCardInfo({...cardInfo, expiry: e.target.value})}
              pattern="\d{2}/\d{2}"
              required
            />
            <input
              type="text"
              placeholder="CVC"
              value={cardInfo.cvc}
              onChange={(e) => setCardInfo({...cardInfo, cvc: e.target.value})}
              pattern="\d{3}"
              required
            />
          </div>
          <button type="submit">Pay Now</button>
        </form>
      </div>
    </div>
  );
};

export default PaymentDetails;