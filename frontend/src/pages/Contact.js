import React from "react";
import './Contact.css'; 

const Contact = () => {
  return (
    <div className="contact-page-container">
      <h1>Contact Us</h1>
      <div className="grid">
        {/* Contact Info */}
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>Feel free to contact us for any inquiries or support.</p>
          <div>
            <h3>Address:</h3>
            <p>Dhaka-1219, Bangladesh</p>
          </div>
          <div>
            <h3>Phone:</h3>
            <ul>
              <li>017********</li>
              <li>013********</li>
            </ul>
          </div>
          <div>
            <h3>Email:</h3>
            <p>haven@gmail.com</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form">
          <h2>Send Message</h2>
          <form>
            <div>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Enter your name" required />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Enter your email" required />
            </div>
            <div>
              <label htmlFor="message">Type your message</label>
              <textarea id="message" placeholder="Write your message here" required></textarea>
            </div>
            <button type="submit">SEND</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
