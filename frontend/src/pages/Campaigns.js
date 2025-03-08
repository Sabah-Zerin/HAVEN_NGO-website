import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Campaigns.css';

axios.defaults.baseURL = 'http://127.0.0.1:8000/api';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    description: '',
    target_amount: '',
    end_date: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();  // Initialize useNavigate

  useEffect(() => {
    fetchCampaigns();
    checkAdminStatus();
  }, []);

  const checkAdminStatus = () => {
    const adminToken = localStorage.getItem('admin_token');
    setIsAdmin(!!adminToken);
  };

  const fetchCampaigns = async () => {
    try {
      const response = await axios.get('/campaigns');
      setCampaigns(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch campaigns');
    }
  };

  const handleDonateClick = (campaignId) => {
    navigate(`/donation?campaignId=${campaignId}`);  // Navigate to donation page with campaign ID
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state

    try {
      const adminToken = localStorage.getItem('admin_token');
      if (!adminToken) {
        setError('Admin authorization required. Please log in.');
        return;
      }

      // Validate inputs
      const targetAmount = parseFloat(newCampaign.target_amount);
      if (isNaN(targetAmount) || targetAmount <= 0) {
        setError('Invalid target amount');
        return;
      }
      if (!newCampaign.name.trim() || !newCampaign.end_date) {
        setError('Please fill in all required fields.');
        return;
      }

      // Log the payload to inspect
      const payload = {
        name: newCampaign.name.trim(),
        description: newCampaign.description?.trim(),
        target_amount: targetAmount,
        end_date: new Date(newCampaign.end_date).toISOString()
      };
      console.log('Payload for campaign creation:', payload);

      // API call with error handling
      const response = await axios.post('/campaigns', payload, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('API Response:', response);

      if (response.status === 201) {
        // Optimistic update with proper state management
        setCampaigns(prev => [response.data, ...prev]);
        setShowForm(false); // Hide form after submission
        setNewCampaign({
          name: '',
          description: '',
          target_amount: '',
          end_date: ''
        });
      }
    } catch (error) {
      console.error('API Error:', error);
      setError(error.response?.data?.message || 'Failed to create campaign. Please check your permissions.');

      // Force logout on 401 error (Unauthorized)
      if (error.response?.status === 401) {
        localStorage.removeItem('admin_token');
        setIsAdmin(false);
      }
    }
  };

  return (
    <div className="campaigns-container">
      <h1 className="campaigns-title">Our Campaigns</h1>
      
      {isAdmin && (
        <>
          <button className="add-campaign-button" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Cancel' : 'Add Campaign'}
          </button>

          {showForm && (
            <form className="campaign-form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Campaign Name"
                value={newCampaign.name}
                onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
                required
              />
              <textarea
                placeholder="Description"
                value={newCampaign.description}
                onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
              />
              <input
                type="number"
                placeholder="Target Amount"
                value={newCampaign.target_amount}
                onChange={(e) => setNewCampaign({ ...newCampaign, target_amount: e.target.value })}
                required
              />
              <input
                type="date"
                value={newCampaign.end_date}
                onChange={(e) => setNewCampaign({ 
                    ...newCampaign,
                    end_date: e.target.value
                })}
                required
              />
              <button type="submit">Create Campaign</button>
            </form>
          )}
        </>
      )}

      <div className="campaigns-list">
        {campaigns.map(campaign => (
          <div key={campaign.id} className="campaign-card">
            <h3>{campaign.name}</h3>
            <p>{campaign.description}</p>
            <div className="campaign-meta">
              <span>Target: ${campaign.target_amount}</span>
              <span>Ends: {new Date(campaign.end_date).toLocaleDateString()}</span>
              <span>Created by: {campaign.admin?.name || 'Admin'}</span>
            </div>
            <div className="campaign-actions">
            <button className="donate-button" onClick={() => handleDonateClick(campaign.id)}>
                Donate Now
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Campaigns;