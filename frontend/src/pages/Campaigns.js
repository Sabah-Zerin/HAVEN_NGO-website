import React, { useState, useEffect } from 'react';
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

  useEffect(() => { fetchCampaigns(); }, []);

  const fetchCampaigns = async () => {
    try {
      const token = localStorage.getItem('user_token');
      const response = await axios.get('/campaigns', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      });
      setCampaigns(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch campaigns');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('user_token');
      if (!token) {
        setError('Session expired. Please login again.');
        return;
      }
  
      const payload = {
        ...newCampaign,
        description: newCampaign.description || null,
        target_amount: parseFloat(newCampaign.target_amount) || 0,
        end_date: newCampaign.end_date ? new Date(newCampaign.end_date).toISOString().split('T')[0] : null,
      };
  
      console.log("Sending Payload:", payload);
  
      const response = await axios.post('/campaigns', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (response.status === 201) {
        console.log("Campaign Created:", response.data);
        setCampaigns([response.data, ...campaigns]);
        setShowForm(false);
        setNewCampaign({ name: '', description: '', target_amount: '', end_date: '' });
      }
    } catch (error) {
      console.error('Error:', error.response?.data);
      setError(error.response?.data?.message || 'Failed to create campaign');
    }
  };
  

  return (
    <div className="campaigns-container">
      <h1 className="campaigns-title">Our Campaigns</h1>
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
                  end_date: e.target.value // Ensure YYYY-MM-DD format
              })}
              required
          />
          <button type="submit">Create Campaign</button>
        </form>
      )}

      <div className="campaigns-list">
        {campaigns.map(campaign => (
          <div key={campaign.id} className="campaign-card">
            <h3>{campaign.name}</h3>
            <p>{campaign.description}</p>
            <div className="campaign-meta">
              <span>Target: ${campaign.target_amount}</span>
              <span>Ends: {new Date(campaign.end_date).toLocaleDateString()}</span>
              <span>Created by: {campaign.user?.name || 'Unknown'}</span>
            </div>
            <div className="campaign-actions">
              <button className="details-button">View Details</button>
              <button className="donate-button">Donate Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Campaigns;