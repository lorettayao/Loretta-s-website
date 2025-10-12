// src/components/RaceChart.jsx
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const getTireColor = (compound) => {
    if (compound === 'Soft') return '#E30613'; // F1 Red
    if (compound === 'Medium') return '#FFEB3B'; // F1 Yellow
    if (compound === 'Hard') return '#4CAF50';  // F1 Green
    if (compound === 'The Croissant') return '#8B4513'; // Brown for Croissant
    return '#8884d8';
};

const RaceChart = ({ tireData }) => {
    if (!tireData || tireData.length === 0) {
    return (
      <div className="panel-card" style={{ height: 400, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <h3>Loading Race Data...</h3>
      </div>
    );
  }
//   const currentCompound = tireData.length > 0 ? tireData[tireData.length - 1].compound : 'N/A';
const currentCompound = 'Medium';  
const lineColor = getTireColor(currentCompound);
  
  return (
    <div className="panel-card" style={{ height: 400 }}> {/* Apply card style, set explicit height */}
      <h3>Tire Degradation and Strategy Overview</h3>
      <p style={{fontSize: '0.9em', color: '#aaa'}}>Current Tire: <span style={{color: lineColor, fontWeight: 'bold'}}>{currentCompound}</span></p>
      <ResponsiveContainer width="100%" height="calc(100% - 70px)"> {/* Adjust height for title/p tags */}
        <LineChart
          data={tireData}
          margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#555" /> {/* Darker grid lines */}
          <XAxis dataKey="lap" label={{ value: 'Lap Number', position: 'bottom', fill: '#eee' }} stroke="#777" />
          <YAxis 
            label={{ value: 'Degradation (%)', angle: -90, position: 'left', fill: '#eee' }}
            domain={[0, 1]} 
            tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} // Format as percentage
            stroke="#777"
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#333', border: '1px solid #555', color: '#fff' }} 
            labelStyle={{ color: '#FF1801' }}
            formatter={(value) => `${(value * 100).toFixed(0)}%`} // Tooltip for percentage
          />
          <Legend wrapperStyle={{ color: '#fff' }} /> {/* Ensure legend text is visible */}
          <Line 
            type="monotone" 
            dataKey="degradation" 
            stroke={lineColor} 
            strokeWidth={3}
            activeDot={{ r: 8, strokeWidth: 2, fill: lineColor, stroke: '#fff' }} 
            name={`Degradation (${currentCompound})`}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RaceChart;