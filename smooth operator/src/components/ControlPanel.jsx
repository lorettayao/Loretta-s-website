// src/components/ControlPanel.jsx
import React from 'react';

const ControlPanel = ({ isOpen, onCall }) => {
  const tireOptions = ['Soft', 'Medium', 'Hard', 'The Croissant'];
  
  return (
    <div style={{ 
        border: '1px solid #0056b3', 
        padding: '20px', 
        marginTop: '20px', 
        textAlign: 'center'
    }}>
      <h3>Strategy Call: WHEN and WHAT TIRE?</h3>
      
      {isOpen ? (
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px' }}>
          {tireOptions.map(tire => (
            <button 
              key={tire} 
              onClick={() => onCall(tire)}
              style={{ padding: '10px 15px', margin: '5px', cursor: 'pointer', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px' }}
            >
              Pit for {tire}
            </button>
          ))}
        </div>
      ) : (
        <p style={{ color: 'red', fontWeight: 'bold' }}>Pitting Window is CLOSED. Strategy locked in!</p>
      )}
      
      <button 
        onClick={() => onCall('Stay Out')} 
        disabled={!isOpen}
        style={{ padding: '10px 15px', margin: '15px 0', cursor: 'pointer', backgroundColor: '#ffc107', border: 'none', borderRadius: '5px' }}
      >
        Wait for a Better Opportunity (Stay Out)
      </button>
      
    </div>
  );
};

export default ControlPanel;