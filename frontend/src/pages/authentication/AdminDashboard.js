import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';

const AdminDashboard = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminData = async () => {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        navigate('/admin-login');
        return;
      }

      try {
        const response = await axios.get('http://127.0.0.1:8000/api/admin', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAdmin(response.data);
      } catch (error) {
        console.error('Error fetching admin data:', error);
        setError('Failed to load admin data');
        localStorage.removeItem('admin_token');
        navigate('/admin-login');
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin-login');
  };

  if (loading) {
    return <div className="profile-container">Loading...</div>;
  }

  if (error) {
    return <div className="profile-container">{error}</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">Admin Dashboard</h2>
        {admin ? (
          <>
            <div className="profile-info">
              <div className="profile-field">
                <label>Name:</label>
                <input type="text" value={admin.name} disabled />
              </div>
              <div className="profile-field">
                <label>Email:</label>
                <input type="email" value={admin.email} disabled />
              </div>
            </div>
            <div className="profile-actions">
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </>
        ) : (
          <p>No admin data available</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;