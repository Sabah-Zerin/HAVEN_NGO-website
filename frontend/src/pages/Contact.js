import React, { useState } from "react";
import axios from "axios";
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    message: "" 
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);
    
    try {
      const response = await axios.post(
        "http://localhost:8000/api/contact", 
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      );
      
      if (response.status === 201) {
        setSubmitStatus('success');
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Submission error:', error);
    }
  };

  return (
    <div className="contact-page-container">
      <h1>Contact Us</h1>
      
      {submitStatus === 'success' && (
        <div className="alert success">
          Message sent successfully!
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="alert error">
          Failed to send message. Please try again.
        </div>
      )}

      <div className="grid">
        {/* Contact Info (unchanged) */}

        <div className="contact-form">
          <h2>Send Message</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here"
                required
              ></textarea>
            </div>
            <button type="submit">SEND</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;