import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Donation.css';

const Donation = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    amount: '',
    name: '',
    email: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Check if user is logged in
    if (!localStorage.getItem('user_token')) {
      navigate('/register');
      return;
    }

    // Save payment data to localStorage
    localStorage.setItem('paymentData', JSON.stringify(formData));
    
    // Redirect to payment details
    navigate('/payment-details');
  };

  return (
    <div className="donation-container">
      <form onSubmit={handleSubmit}>
        <h2>Make a Donation</h2>
        
        <div className="form-group">
          <label>Amount (BDT):</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            min="10"
            required
          />
        </div>

        <div className="form-group">
          <label>Full Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Proceed to Payment
        </button>
      </form>
    </div>
  );
};

export default Donation;