# PredictPal

PredictPal is a web application designed for Formula 1 enthusiasts to register, log in, and submit race predictions.
Users can select their top three drivers for each Grand Prix and view a global leaderboard ranking all participants by their total points.
The project demonstrates a complete full-stack architecture using React (Vite) for the frontend, Express.js for the backend, and MongoDB for persistent data storage.

---

## 1. Project Overview

**Frontend:** React (Vite)
**Backend:** Node.js / Express.js
**Database:** MongoDB
**Authentication:** JWT (JSON Web Tokens)

PredictPal aims to provide a seamless and engaging prediction experience, integrating account management, prediction submission, and leaderboard visualization within a single application.

---

## 2. Project Structure

```
backend/
 ├─ models/           # MongoDB schemas (User, Prediction)
 ├─ routes/           # Express routes (auth, predictions, leaderboard)
 ├─ server.js         # Backend entry point
 └─ .env.example      # Example environment variables

smooth-operator/      # Frontend project (React + Vite)
 ├─ src/
 │   ├─ components/   # Shared components (Navbar, etc.)
 │   ├─ pages/        # Pages (Login, Register, Predictions, Leaderboard)
 │   ├─ services/     # Axios configuration
 │   ├─ data/         # Static data (driver and race lists)
 │   └─ App.jsx       # Route definitions
 ├─ index.css         # Global styles
 └─ vite.config.js
```

---

## 3. Installation and Setup

### 3.1. Requirements

* Node.js v18 or later
* npm
* A running MongoDB instance (local or Atlas)

---

### 3.2. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   npm install
   ```
2. Create a `.env` file in the backend root directory:
   ```env
   PORT=5001
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
3. Start the backend server:
   ```bash
   npm start
   ```

The backend will be available on:
`http://localhost:5001`

---

### 3.3. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd smooth-operator
   npm install
   ```
2. Start the Vite development server:
   ```bash
   npm run dev
   ```

The frontend will be available on:
`http://localhost:5173`

---

## 4. Features

* **User Authentication**: Secure registration and login using JWT.
* **Predictions**: Users can select the top three finishers for each Grand Prix.
* **Leaderboard**: Displays all registered users ranked by their accumulated points.
* **Database Integration**: MongoDB stores users, predictions, and points.
* **Responsive Frontend**: Clean, minimal, dark-themed user interface.

---

## 5. API Endpoints

### Authentication


| Method | Endpoint             | Description                      |
| ------ | -------------------- | -------------------------------- |
| POST   | `/api/auth/register` | Register a new user              |
| POST   | `/api/auth/login`    | Log in a user and return a token |

### Predictions


| Method | Endpoint           | Description             |
| ------ | ------------------ | ----------------------- |
| GET    | `/api/predictions` | Fetch user predictions  |
| POST   | `/api/predictions` | Submit a new prediction |

### Leaderboard


| Method | Endpoint           | Description           |
| ------ | ------------------ | --------------------- |
| GET    | `/api/leaderboard` | Retrieve ranked users |

---

## 6. Future Work

* Implement a **rating system** to automatically assign points based on actual race results.
* Integrate real-time **Grand Prix data fetching** using the Ergast API or a similar F1 data source.
* Add **animations and transitions** for leaderboard ranking changes.
* Extend profile functionality to display a user’s prediction history and statistics.
* Improve responsive design for mobile and tablet devices.
