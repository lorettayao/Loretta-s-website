// src/components/RaceChart.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Helper to assign a color based on the compound for the legend/line
const getTireColor = (compound) => {
    if (compound === 'Soft') return '#E30613';
    if (compound === 'Medium') return '#FFEB3B';
    if (compound === 'Hard') return '#4CAF50';
    // The humorous tire!
    if (compound === 'Croissant') return '#8B4513'; 
    return '#8884d8';
};

const RaceChart = ({ tireData }) => {
  // We'll dynamically determine the current compound for labeling
  const currentCompound = tireData.length > 0 ? tireData[tireData.length - 1].compound : 'N/A';
  const lineColor = getTireColor(currentCompound);
  
  return (
    <div style={{ width: '100%', height: 300, marginBottom: '20px', border: '1px solid #ccc' }}>
      <h3>Tire Degradation and Strategy Overview (Current: {currentCompound})</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={tireData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="lap" label={{ value: 'Lap Number', position: 'bottom' }} />
          <YAxis 
            label={{ value: 'Degradation (%)', angle: -90, position: 'left' }}
            domain={[0, 1]} // Percentage from 0% to 100%
          />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="degradation" 
            stroke={lineColor} 
            activeDot={{ r: 8 }} 
            name={`Degradation (${currentCompound})`}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RaceChart;