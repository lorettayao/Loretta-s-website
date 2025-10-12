// src/components/ControlPanel.jsx
import React from 'react';
// IMPORT the background image here
import pitlaneBackground from '../assets/ferrari_car.png';

const ControlPanel = ({ isOpen, onCall }) => {
  const tireOptions = ['Soft', 'Medium', 'Hard', 'The Croissant'];
  
  return (
    <div className="panel-card" style={{ position: 'relative', overflow: 'hidden' }}>
      <h3>Strategy Call: WHEN and WHAT TIRE?</h3>
      
      {/* Background image using the imported variable */}
      <img 
        src={pitlaneBackground} 
        alt="F1 Pitlane" 
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.1, zIndex: 0 }} 
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* ... (Button code remains the same) ... */}
        {isOpen ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
            {tireOptions.map(tire => (
              <button 
                key={tire} 
                onClick={() => onCall(tire)}
                style={{ 
                    backgroundColor: tire === 'The Croissant' ? '#8B4513' : (tire === 'Soft' ? '#E30613' : (tire === 'Medium' ? '#FFEB3B' : '#4CAF50')), 
                    color: tire === 'Medium' ? '#000' : 'white', 
                    borderColor: tire === 'The Croissant' ? '#6B3C13' : 'transparent',
                    fontWeight: 'bold'
                }}
              >
                Pit for {tire}
              </button>
            ))}
            <button 
                onClick={() => onCall('Stay Out')} 
                style={{ backgroundColor: '#007bff', marginTop: '15px' }}
            >
                Wait for a Better Opportunity (Stay Out)
            </button>
          </div>
        ) : (
          <p style={{ color: '#ff4d4d', fontWeight: 'bold', fontSize: '1.1em' }}>Pitting Window is CLOSED. Strategy locked in!</p>
        )}
      </div>
    </div>
  );
};

export default ControlPanel;