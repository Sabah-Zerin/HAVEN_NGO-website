import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
        <div
          className="dropdown"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <button className="dropdown-toggle">
            Log In / Register ▼
          </button>
          {dropdownOpen && (
            <ul className="dropdown-menu">
              <li>
                <Link to="/login">User Login</Link>
              </li>
              <li>
                <Link to="/register">User Register</Link>
              </li>
              <li>
                <Link to="/admin-login">Admin Login</Link>
              </li>
              <li>
                <Link to="/admin-register">Admin Register</Link>
              </li>
            </ul>
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

