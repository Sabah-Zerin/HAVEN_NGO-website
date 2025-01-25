import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Donation from './pages/Donation';
import PaymentDetails from './pages/PaymentDetails';
import Signin from './pages/authentication/Signin';
import Signup from './pages/authentication/Signup';
import Profile from './pages/authentication/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/donation" element={<Donation />} />
        <Route path="/payment-details" element={<PaymentDetails />} />
        <Route path="/campaigns" element={<h1>Campaigns Page</h1>} />
        <Route path="/about" element={<h1>About Us Page</h1>} />
        <Route path="/login" element={<Signin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/contact" element={<h1>Contact Us Page</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
