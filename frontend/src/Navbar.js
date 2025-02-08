import React, { useState } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'; // keep this for other styles but remove JS import

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="/favicon.ico"
            alt="Haven Logo"
            style={{ width: "40px", marginRight: "10px" }}
          />
          <span>Haven</span>
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

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/campaigns">Campaigns</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About Us</Link>
            </li>
            {/* Dropdown */}
            <li className="nav-item relative">
              <button
                className="nav-link dropdown-toggle"
                onClick={toggleDropdown}
              >
                Log In / Register
              </button>
              {isDropdownOpen && (
                <ul className="absolute bg-white shadow-md mt-2 rounded-lg w-48">
                  <li>
                    <Link className="dropdown-item py-2 px-4" to="/login">User Login</Link>
                  </li>
                  <li>
                    <Link className="dropdown-item py-2 px-4" to="/register">User Register</Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item py-2 px-4" to="/admin-login">Admin Login</Link>
                  </li>
                  <li>
                    <Link className="dropdown-item py-2 px-4" to="/admin-register">Admin Register</Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
