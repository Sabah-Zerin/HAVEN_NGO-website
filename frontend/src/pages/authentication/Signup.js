import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import Navbar from '../../Navbar';
import './Auth.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate(); // Initialize navigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError('');
    setSuccess('');
  };

  const validateForm = () => {
    const { name, email, password, password_confirmation } = formData;

    if (!name || !email || !password || !password_confirmation) {
      return 'Please fill the form';
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      return 'Email is not right';
    }

    if (password.length < 3) {
      return 'Password must be at least 3 characters';
    }

    if (password !== password_confirmation) {
      return 'Passwords do not match';
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/signup', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        setSuccess('User created successfully!');
        setFormData({
          name: '',
          email: '',
          password: '',
          password_confirmation: '',
        });

        navigate('/login'); // Redirect to the Signin page
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Signup failed. Please try again.');
      } else if (error.request) {
        setError('No response from the server. Please try again later.');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="auth-container">
        <div className="auth-left">

        <h1>Come Join Us!</h1>
<p>
  We are so excited to have you here. Create an account to get access to
  exclusive offers, rewards, and discounts.
</p>
<Link to="/login" className="auth-switch-link">
  Already have an account? Sign in.
</Link>



        </div>
        <div className="auth-right">
          <h2>Signup</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Username"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <input
              type="password"
              name="password_confirmation"
              value={formData.password_confirmation}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
            />
            <button type="submit">Signup</button>
          </form>
          {error && <p className="error" aria-live="polite">{error}</p>}
          {success && <p className="success" aria-live="polite">{success}</p>}
        </div>
      </div>
    </>
  );
};

export default Signup;
