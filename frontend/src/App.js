import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar"; // Assuming Navbar is in the components folder
import Homepage from "./pages/Homepage";
import Donation from "./pages/Donation";
import PaymentDetails from "./pages/PaymentDetails";
import Signin from "./pages/authentication/Signin";
import Signup from "./pages/authentication/Signup";
import Profile from "./pages/authentication/Profile";
import Campaigns from "./pages/Campaigns"; // Assuming Campaigns.js exists in pages
import About from "./pages/About"; // Assuming About.js exists in pages
import Contact from "./pages/Contact";

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
        <Route path="/login" element={<Signin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
