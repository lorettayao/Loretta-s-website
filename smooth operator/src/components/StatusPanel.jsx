// src/components/StatusPanel.jsx
import React from 'react';

const StatusPanel = ({ state }) => {
  return (
    <div style={{ 
        border: '1px solid #ddd', 
        padding: '15px', 
        marginBottom: '20px',
        backgroundColor: '#f9f9f9'
    }}>
      <h2>Race Status: {state.raceId.toUpperCase()}</h2>
      <p><strong>Current Lap:</strong> {state.currentLap} / {state.totalLaps}</p>
      <p><strong>Carlos's Position:</strong> P{state.carlosPosition}</p>
      <p><strong>Weather Report:</strong> {state.weather}</p>
      <p style={{ fontWeight: 'bold', color: state.carlosMoodIndex < 50 ? 'red' : 'green' }}>
        Smooth Operator Mood Index (CMI): {state.carlosMoodIndex}
      </p>
      <p><strong>Pitting Window:</strong> {state.pittingWindowOpen ? 'OPEN' : 'CLOSED'}</p>
    </div>
  );
};

export default StatusPanel;