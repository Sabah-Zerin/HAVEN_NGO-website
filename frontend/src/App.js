import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Homepage from "./pages/Homepage";
import Donation from "./pages/Donation";
import PaymentDetails from "./pages/PaymentDetails";
import Login from "./pages/authentication/Login";
import Signup from "./pages/authentication/Signup";
import Profile from "./pages/authentication/Profile";
import Campaigns from "./pages/Campaigns";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/authentication/AdminLogin";
import AdminSignup from "./pages/authentication/AdminSignup";
import AdminDashboard from "./pages/authentication/AdminDashboard"; // Optional



function App() {
  return (
    <Router>
      {/* Navbar included for consistent navigation across pages */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/donation" element={<Donation />} />
        <Route path="/payment-details" element={<PaymentDetails />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        {/* User Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />

        {/* Admin Authentication Routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-register" element={<AdminSignup />} />

        {/* Admin Dashboard (optional) */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;