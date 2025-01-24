import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Add styles for the navigation bar

const Navbar = () => {
  return (
    <nav className="nav-bar">
      <div className="logo-container">
        <img src="/favicon.ico" className="logo" alt="Haven Logo" />
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/campaigns">Campaigns</Link>
        <Link to="/about">About Us</Link>
        <Link to="/login">LogIn/Reg</Link>
        <Link to="/contact">Contact Us</Link>
      </div>
    </nav>
  );
};

export default Navbar;
