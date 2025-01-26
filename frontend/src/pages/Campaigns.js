import React from "react";
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page-container bg-gray-50 py-10 px-4 md:px-20 flex items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Contact Us</h1>
      <div className="grid grid-cols-1 gap-8 w-full max-w-4xl">
        {/* Contact Info Section */}
        <div className="contact-info bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-4">Feel free to contact us for any inquiries or support.</p>
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-700">Address:</h3>
            <p className="text-gray-600">Dhaka-1219, Bangladesh</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-700">Phone:</h3>
            <ul className="text-gray-600">
              <li>• 017********</li>
              <li>• 013********</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-700">Email:</h3>
            <p className="text-gray-600">haven@gmail.com</p>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="contact-form bg-lavender shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Send Message</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                Type your message
              </label>
              <input
                id="message"
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Write your message here"
                required
              ></input>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              SEND
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
