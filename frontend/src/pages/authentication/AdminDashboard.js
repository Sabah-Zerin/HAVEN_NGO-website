import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';  // Importing the new CSS styles

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/AdminLogin'); // If no token, redirect to login
    } else {
      // Normally, you would fetch user data from an API using the token
      // For this example, we'll use a mock user
      setUser({
        name: 'ADMIN',
        email: 'ADMIN@example.com',
      });
    }
  }, [navigate]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('admin_token'); // Clear token
    navigate('/admin-login'); // Redirect to login page
  };

  return (
    <>
      
      <div className="profile-container">
        <div className="profile-card">
          <h2 className="profile-title">Admin Profile</h2>
          {user ? (
            <>
              <div className="profile-info">
                <div className="profile-field">
                  <label>Name:</label>
                  <input type="text" value={user.name} disabled />
                </div>
                <div className="profile-field">
                  <label>Email:</label>
                  <input type="email" value={user.email} disabled />
                </div>
              </div>
              <div className="profile-actions">
                <button className="logout-button" onClick={handleLogout}>Logout</button>
              </div>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
};


export default AdminDashboard;