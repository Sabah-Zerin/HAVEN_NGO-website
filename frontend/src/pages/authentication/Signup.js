import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
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
  const [authError, setAuthError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in
    const userToken = localStorage.getItem('user_token');
    const adminToken = localStorage.getItem('admin_token');
    if (userToken) {
      setAuthError('You are already logged in as a User, please logout to sign up as an Admin.');
    }
    if (adminToken) {
      setAuthError('You are already logged in as an Admin, please logout to sign up as a User.');
    }
  }, []);

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

    if (authError) return;

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
        navigate('/login'); // Redirect to the Login page
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
    <div className="auth-container">
      <div className="auth-left">
        <h1>Come Join Us!</h1>
        <p>We are so excited to have you here. Create an account to get access to exclusive offers, rewards, and discounts.</p>
        <Link to="/login" className="auth-switch-link">Already have an account? Log in.</Link>
      </div>
      <div className="auth-right">
        <h2>Signup</h2>
        {authError && <p className="auth-error">{authError}</p>}
        {!authError && (
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
        )}
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </div>
    </div>
  );
};

export default Signup;
