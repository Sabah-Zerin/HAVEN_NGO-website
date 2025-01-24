import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const Signin = () => {
  return (
    <div className="auth-container">
      <div className="auth-left">
        <h1>Welcome Back!</h1>
        <p>Sign in to your account to continue accessing our exclusive services.</p>
        <Link to="/register" className="auth-switch-link">
          Don't have an account? Signup
        </Link>
      </div>
      <div className="auth-right">
        <h2>Signin</h2>
        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
