import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const Signup = () => {
  return (
    <div className="auth-container">
      <div className="auth-left">
        <h1>Come join us!</h1>
        <p>
          We are so excited to have you here. Create an account to get access to
          exclusive offers, rewards, and discounts.
        </p>
        <Link to="/login" className="auth-switch-link">
          Already have an account? Signin.
        </Link>
      </div>
      <div className="auth-right">
        <h2>Signup</h2>
        <form>
          <input type="text" placeholder="Username" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <input type="password" placeholder="Confirm Password" required />
          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
