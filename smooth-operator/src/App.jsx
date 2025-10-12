import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
// import { mockRaceState } from './mockData';
import RaceChart from './components/RaceChart';
import ControlPanel from './components/ControlPanel';
import StatusPanel from './components/StatusPanel';

const SOCKET_SERVER_URL = 'http://localhost:3001'; 

// Define a safe initial state that includes all keys the components rely on
const initialRaceState = {
    raceId: 'MONZA-2025',
    currentLap: 0, 
    totalLaps: 53,
    carlosPosition: 0, 
    carlosMoodIndex: 50,
    weather: 'Connecting...',
    pittingWindowOpen: false,
    // Start with a minimal, safe tire data point
    tireData: [{ lap: 0, degradation: 0.0, compound: 'Medium' }], 
    raceOver: false,
};

function App() {
  const [raceState, setRaceState] = useState(initialRaceState);
  
  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL);

    socket.on('raceUpdate', (newRaceState) => {
      console.log('Received Lap Update:', newRaceState.currentLap);
      
      setRaceState(prev => {
          // If the lap hasn't advanced, just update the top-level stats (e.g., CMI changes mid-lap)
          if (prev.currentLap >= newRaceState.currentLap) {
              return { ...prev, ...newRaceState };
          }
          
          // --- Logic for new lap and tire data (The game's core) ---
          
          // 1. Calculate the new degradation point for the chart
          // Degradation is based on laps completed, plus CMI for chaotic variation
          const baseDegradation = (newRaceState.currentLap / newRaceState.totalLaps); 
          const cmiFactor = (newRaceState.carlosMoodIndex / 100) * 0.15; // 15% chaos factor
          
          const newTirePoint = { 
              lap: newRaceState.currentLap, 
              // Scale degradation to 0.1 - 1.0 range
              degradation: Math.min(1.0, baseDegradation * 0.9 + cmiFactor), 
              // NOTE: Compound hardcoded until Pit Call logic is fully implemented
              compound: 'Medium' 
          };

          // 2. Return the new, complete state
          return {
              ...newRaceState,
              // Append the new tire data point
              tireData: [...prev.tireData, newTirePoint]
          };
      });
    });

    // Handle connection or errors (Good practice for debugging)
    socket.on('connect_error', (err) => {
        console.error("Socket Connection Error:", err.message);
    });

    return () => socket.disconnect();
  }, []); 

  // Handles the player's pit stop decision
  const handlePitCall = (tireCompound) => {
    if (!raceState.pittingWindowOpen) return;
    
    // In a final version, this would be an API call to the backend strategy engine
    // socket.emit('pitCall', { tire: tireCompound, lap: raceState.currentLap });
    
    alert(`PIT CALL MADE: ${tireCompound} on Lap ${raceState.currentLap}!`);
    
    // Reset degradation and update compound on the client-side immediately
    setRaceState(prev => ({
        ...prev, 
        pittingWindowOpen: false, 
        carlosPosition: prev.carlosPosition + 3, // Pit penalty
        // Start a new tire stint (remove all old data, keep only the pit lap)
        tireData: [{ 
            lap: prev.currentLap, 
            degradation: 0.05, 
            compound: tireCompound // Set new compound!
        }]
    }));
  };

  return (
    <div className="dashboard-container">
      <h1>Smooth Operator Strategy Game</h1>
      
      <StatusPanel state={raceState} /> 
      
      <div className="main-area"> 
          {/* Using the simple placeholder component until recharts is fixed */}
          <div className="panel-card" style={{height: 400, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
              <h3 style={{color: '#FF1801'}}>CHART DATA IS ALIVE!</h3>
              <p>Current Lap: <span style={{color: '#90ee90', fontWeight: 'bold'}}>{raceState.currentLap}</span></p>
              <p>CMI: {raceState.carlosMoodIndex}</p>
          </div>
          
          {/* Use the actual RaceChart when ready: */}
          {/* <RaceChart tireData={raceState.tireData} /> */}
          
          <ControlPanel 
              isOpen={raceState.pittingWindowOpen} 
              onCall={handlePitCall} 
          />
      </div>
      
    </div>
  );
}

export default App;