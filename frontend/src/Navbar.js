import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  return (
    <nav className="nav-bar">
      {/* Logo Section */}
      <div className="logo-container">
        <Link to="/">
          <img src="/favicon.ico" className="logo" alt="Haven Logo" />
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="nav-links">
        <Link
          to="/campaigns"
          className={location.pathname === "/campaigns" ? "active-link" : ""}
        >
          Campaigns
        </Link>
        <Link
          to="/about"
          className={location.pathname === "/about" ? "active-link" : ""}
        >
          About Us
        </Link>

        {/* Dropdown Section */}
        <div className="dropdown">
          <button className="nav-btn login-btn" onClick={toggleDropdown}>
            Log In
          </button>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <Link
                to="/login"
                className={location.pathname === "/login" ? "active-link" : ""}
                onClick={() => setDropdownOpen(false)}
              >
                User Login
              </Link>
              <Link
                to="/admin-login"
                className={
                  location.pathname === "/admin-login" ? "active-link" : ""
                }
                onClick={() => setDropdownOpen(false)}
              >
                Admin Login
              </Link>
            </div>
          )}
        </div>

        <Link
          to="/contact"
          className={location.pathname === "/contact" ? "active-link" : ""}
        >
          Contact Us
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
