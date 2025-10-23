import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Navigate } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Predictions from "./pages/Predictions"
import Leaderboard from "./pages/Leaderboard"
import Navbar from "./components/Navbar"

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token")
  return token ? children : <Navigate to="/login" />
}

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/predictions"
          element={
            <PrivateRoute>
              <Predictions />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
