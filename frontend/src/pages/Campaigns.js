import React, { useState } from 'react';
import './Campaigns.css';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [newCampaignName, setNewCampaignName] = useState('');
  const [showInput, setShowInput] = useState(false);

  const addCampaign = () => {
    if (newCampaignName.trim()) {
      setCampaigns([...campaigns, { name: newCampaignName }]);
      setNewCampaignName('');
      setShowInput(false);
    }
  };

  return (
    <div className="campaigns-container">
      <h1 className="campaigns-title">Our Campaigns</h1>
      <button className="add-campaign-button" onClick={() => setShowInput(!showInput)}>
        Add Campaign
      </button>
      {showInput && (
        <div className="campaign-input-container">
          <input
            type="text"
            className="campaign-input"
            value={newCampaignName}
            onChange={(e) => setNewCampaignName(e.target.value)}
            placeholder="Enter campaign name"
          />
          <button className="ok-button" onClick={addCampaign}>OK</button>
        </div>
      )}
      <table className="campaigns-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Campaign Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.length === 0 ? (
            <tr>
              <td colSpan="3" className="no-campaigns">No campaigns available</td>
            </tr>
          ) : (
            campaigns.map((campaign, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{campaign.name}</td>
                <td>
                  <button className="details-button">Details</button>
                  <button className="donate-button">Donate</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Campaigns;