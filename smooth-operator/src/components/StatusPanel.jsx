import React from 'react';
// 修正：由於無法解析本地圖片路徑，我們改用線上 Placeholder 圖片。
// 移除原本的程式碼: import carlosPortrait from '../assets/carlos.png'; 

// 關鍵修復：在解構 state 時，為 state 提供一個空物件的預設值 {}
const StatusPanel = ({ state = {} }) => {
  
  // 使用安全預設值，確保即使數據延遲到達，組件也不會崩潰
  const raceId = state.raceId || 'N/A';
  const currentLap = state.currentLap ?? 0;
  const totalLaps = state.totalLaps ?? 53;
  const carlosPosition = state.carlosPosition ?? '?';
  const weather = state.weather || 'Unknown';
  const carlosMoodIndex = state.carlosMoodIndex ?? 50;
  const pittingWindowOpen = state.pittingWindowOpen ?? false;


  return (
    <div className="panel-card" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
      <div>
        {/* 使用安全的 raceId 變數 */}
        <h2>Race Status: {raceId.toUpperCase()}</h2> 
        <p><strong>Current Lap:</strong> {currentLap} / {totalLaps}</p>
        <p><strong>Carlos's Position:</strong> P{carlosPosition}</p>
        <p><strong>Weather Report:</strong> {weather}</p>
        <p style={{ fontWeight: 'bold', color: carlosMoodIndex < 50 ? '#ff4d4d' : '#90ee90' }}>
          Smooth Operator Mood Index (CMI): {carlosMoodIndex}
        </p>
        <p><strong>Pitting Window:</strong> <span style={{ color: pittingWindowOpen ? '#90ee90' : '#ff4d4d' }}>{pittingWindowOpen ? 'OPEN' : 'CLOSED'}</span></p>
      </div>
      
      <div>
        <img 
            // 使用 Placeholder URL，確保編譯成功且有圖片顯示
            src="https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcRSD5FdUSJh7WcH4fEQPMSOjTZtwEbZKJuzGAPStdSLffk5xBVhhkgGiUVQ8XXGaJ7GQAF7-BHEdP9TXIluhAhNxrNU9obSSB8NhOKr1xkz5NCQAyNzQSSYiGGezkVEfhI2E0INEW1L-xZi"
            alt="Carlos Sainz" 
            style={{ width: '150px', height: 'auto', borderRadius: '8px', border: '2px solid #FF1801' }} 
        />
        <p style={{fontSize: '0.8em', color: '#aaa'}}>*Current Driver Performance Status: Optimistic</p>
      </div>
    </div>
  );
};

export default StatusPanel;
