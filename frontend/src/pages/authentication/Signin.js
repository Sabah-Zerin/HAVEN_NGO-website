import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../Navbar';
import './Auth.css';

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  // Check if user is already logged in, if yes, redirect to profile page
  useEffect(() => {
    if (localStorage.getItem('user_token')) {
      navigate('/profile'); // Redirect to profile if already logged in
    }
  }, [navigate]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError('');
    setSuccess('');
  };

  // Validate form input
  const validateForm = () => {
    const { email, password } = formData;

    if (!email || !password) {
      return 'Please fill out both fields';
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      return 'Email is not valid';
    }

    return null;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setSuccess('Login Successful!');
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          setSuccess('');
        }, 5000);

        // Store token in localStorage
        localStorage.setItem('user_token', response.data.token);
        
        // Redirect to homepage or any other page
        navigate('/profile'); // Redirect to profile page
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || 'Login failed. Please try again.');
      } else if (error.request) {
        setError('No response from the server. Please try again later.');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <>
      
      <div className="auth-container">
        <div className="auth-left">
          <h1>Welcome Back!</h1>
          <p>Sign in to your account to continue accessing our exclusive services.</p>
          <Link to="/register" className="auth-switch-link">
            Don't have an account? Sign up
          </Link>
        </div>
        <div className="auth-right">
          <h2>Sign In</h2>
          <form onSubmit={handleSubmit}>
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
            <button type="submit">Sign In</button>
          </form>
          {error && <p className="error" aria-live="polite">{error}</p>}
          {success && <p className="success" aria-live="polite">{success}</p>}
        </div>
      </div>
    </>
  );
};

export default Signin;
