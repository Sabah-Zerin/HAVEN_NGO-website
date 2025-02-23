import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Check if admin or user is logged in
  useEffect(() => {
    const adminToken = localStorage.getItem('admin_token');
    const userToken = localStorage.getItem('user_token');

    if (adminToken) {
      navigate('/admin-dashboard');
    } else if (userToken) {
      setError('You are already logged in as User. Please logout to login as Admin.');
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
    if (!email || !password) return 'Please fill out both fields';
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) return 'Email is not valid';
    return null;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (localStorage.getItem('user_token')) {
      setError('You are already logged in as User. Please logout to login as Admin.');
      return;
    }

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/admin/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        setSuccess('Login successful!');
        // In your AdminLogin component
        localStorage.setItem('admin_token', response.data.access_token);
        navigate('/admin-dashboard');
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
    <div className="auth-container">
      <div className="auth-left">
        <h1>Welcome Back, Admin!</h1>
        <p>Log in to your admin account to manage the platform.</p>
        <Link to="/admin-register" className="auth-switch-link">
          Don't have an account? Sign up
        </Link>
      </div>
      <div className="auth-right">
        <h2>Admin Login</h2>
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
          <button type="submit">Log In</button>
        </form>
        {error && <p className="error" aria-live="polite">{error}</p>}
        {success && <p className="success" aria-live="polite">{success}</p>}
      </div>
    </div>
  );
};

export default AdminLogin;
