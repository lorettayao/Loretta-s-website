// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

// 設置 WebSocket 伺服器
const io = new Server(server, {
  cors: {
    // Make sure the origin is precisely your frontend's host and port
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"]
  }
});

const PORT = 3001;

// 模擬器參數
let raceState = {
  currentLap: 0,
  totalLaps: 53,
  carlosPosition: 4,
  carlosMoodIndex: 50,
  weather: 'Sunny',
  pittingWindowOpen: true,
};

// 隨機數生成函式
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// 模擬比賽推進的函式
const startRaceSimulation = () => {
  const simulationInterval = setInterval(() => {
    // 1. 推進圈數
    raceState.currentLap += 1;
    
    // 2. 隨機更新幽默數據 (CMI)
    raceState.carlosMoodIndex = Math.max(1, Math.min(100, raceState.carlosMoodIndex + getRandomInt(-2, 2)));

    // 3. 隨機更新名次
    if (Math.random() < 0.3) { 
        raceState.carlosPosition = Math.max(1, Math.min(10, raceState.carlosPosition + getRandomInt(-1, 1)));
    }

    // 4. 隨機產生搞笑事件
    if (raceState.carlosMoodIndex > 85 && Math.random() < 0.1) {
        raceState.weather = 'Croissant Shower Detected';
    } else if (raceState.carlosMoodIndex < 20 && Math.random() < 0.1) {
        raceState.weather = 'Mandatory Pit for a "Smooth Operator" Haircut';
    } else {
        raceState.weather = 'Track Clear / Sunny';
    }

    // 5. 檢查比賽是否結束
    if (raceState.currentLap >= raceState.totalLaps) {
      clearInterval(simulationInterval);
      io.emit('raceUpdate', { ...raceState, raceOver: true, finalResult: `Carlos finished P${raceState.carlosPosition} - What a strategist!` });
      console.log('Race finished.');
      return;
    }

    // 6. 將更新後的狀態發送到所有連線的客戶端
    io.emit('raceUpdate', raceState);
    
    console.log(`Lap ${raceState.currentLap}: CMI=${raceState.carlosMoodIndex}`);
    
  }, 3000); // 每 3 秒更新一次狀態
};

// 在伺服器啟動後，立即開始模擬
startRaceSimulation(); 

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  
  // 首次連線時發送初始狀態
  socket.emit('raceUpdate', raceState);

  // 之後我們會在這裡添加接收前端 Pit Call 的邏輯
  // socket.on('pitCall', (data) => { ... });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`Backend Server running on port ${PORT}`);
  console.log('Waiting for frontend connection...');
});