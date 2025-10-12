// src/App.jsx (Simplified for clarity - use Tailwind or CSS for style)
import React, { useState } from 'react';
import { mockRaceState } from './mockData';
import RaceChart from './components/RaceChart';
import ControlPanel from './components/ControlPanel';
import StatusPanel from './components/StatusPanel';

function App() {
  const [raceState, setRaceState] = useState(mockRaceState);
  
  // Later, this function will make an API call (Pit Call)
  const handlePitCall = (tireCompound) => {
    alert(`PIT CALL MADE: ${tireCompound}`);
    // Update the state to reflect the call (e.g., close the pit window)
    setRaceState(prev => ({
        ...prev, 
        pittingWindowOpen: false, 
        carlosPosition: prev.carlosPosition + 1 // Penalty for pitting
    }));
  };

  return (
    <div className="dashboard-container">
      <h1>Smooth Operator Strategy Game</h1>
      
      <StatusPanel state={raceState} />
      
      <div className="main-area">
          {/* Create this component in src/components/RaceChart.jsx */}
          <RaceChart tireData={raceState.tireData} /> 
          
          {/* Create this component in src/components/ControlPanel.jsx */}
          <ControlPanel 
              isOpen={raceState.pittingWindowOpen} 
              onCall={handlePitCall} 
          />
      </div>
      
    </div>
  );
}

export default App;