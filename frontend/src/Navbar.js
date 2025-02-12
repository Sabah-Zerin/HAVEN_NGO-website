import React, { useState } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm custom-navbar">
      <div className="container">
        {/* Logo Button - Home */}
        <Link className="navbar-brand" to="/">
          <img src="/favicon.ico" alt="Haven Logo" className="nav-logo" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav nav-buttons">
            <li className="nav-item">
              <Link className="nav-link nav-btn" to="/campaigns">Campaigns</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link nav-btn" to="/about">About Us</Link>
            </li>
            <li className="nav-item nav-gap">
              <Link className="nav-link nav-btn" to="/contact">Contact Us</Link>
            </li>

            {/* Dropdown - Login/Register */}
            <li className="nav-item position-relative">
              <button className="nav-link dropdown-toggle nav-btn login-btn" onClick={toggleDropdown}>
                Log In / Register
              </button>
              {isDropdownOpen && (
                <ul className="dropdown-menu show">
                  <li><Link className="dropdown-item" to="/login">User Login</Link></li>
                  <li><Link className="dropdown-item" to="/register">User Register</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item" to="/admin-login">Admin Login</Link></li>
                  <li><Link className="dropdown-item" to="/admin-register">Admin Register</Link></li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
