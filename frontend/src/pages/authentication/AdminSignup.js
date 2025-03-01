import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    admin_secret: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [authError, setAuthError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    // Check if the admin or user is already logged in
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
    const { name, email, password, admin_secret } = formData;

    if (!name || !email || !password || !admin_secret) {
      return 'Please fill out all fields';
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      return 'Email is not valid';
    }

    if (password.length < 3) {
      return 'Password must be at least 3 characters';
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
      const response = await axios.post('http://localhost:8000/api/admin/register', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        setSuccess('Admin registered successfully!');
        setFormData({
          name: '',
          email: '',
          password: '',
          admin_secret: '',
        });
        navigate('/admin-login'); // Redirect to Admin Login page
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
        <h1>Welcome Admin!</h1>
        <p>Create an admin account to manage the platform efficiently.</p>
        <Link to="/admin-login" className="auth-switch-link">
          Already an admin? Log in
        </Link>
      </div>
      <div className="auth-right">
        <h2>Admin Signup</h2>
        {authError && <p className="auth-error">{authError}</p>}
        {!authError && (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
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
              type="text"
              name="admin_secret"
              value={formData.admin_secret}
              onChange={handleChange}
              placeholder="Admin Registration Code"
              required
            />
            <button type="submit">Sign Up</button>
          </form>
        )}
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
      </div>
    </div>
  );
};

export default AdminSignup;
