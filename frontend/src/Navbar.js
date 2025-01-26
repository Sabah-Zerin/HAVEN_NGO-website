import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();

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
        <Link
          to="/login"
          className={location.pathname === "/login" ? "active-link" : ""}
        >
          Log In / Register
        </Link>
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
