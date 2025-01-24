import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/campaigns" element={<h1>Campaigns Page</h1>} />
        <Route path="/about" element={<h1>About Us Page</h1>} />
        <Route path="/login" element={<h1>Login Page</h1>} />
        <Route path="/register" element={<h1>Register Page</h1>} />
        <Route path="/contact" element={<h1>Contact Us Page</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
