import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="nav-bar">
      <div className="logo-container">
        <Link to="/">
          <img src="/favicon.ico" className="logo" alt="Haven Logo" />
        </Link>
      </div>

      <div className="nav-links">
        <Link to="/campaigns" className={location.pathname === "/campaigns" ? "active-link" : ""}>
          Campaigns
        </Link>
        <Link to="/about" className={location.pathname === "/about" ? "active-link" : ""}>
          About Us
        </Link>

        <div className="dropdown">
          <button className="nav-btn login-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
            Log In
          </button>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/login" onClick={() => setDropdownOpen(false)}>User Login</Link>
              <Link to="/admin-login" onClick={() => setDropdownOpen(false)}>Admin Login</Link>
            </div>
          )}
        </div>


        <Link to="/contact" className={location.pathname === "/contact" ? "active-link" : ""}>
          Contact Us
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
