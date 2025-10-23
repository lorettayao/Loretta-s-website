import express from "express"
import Prediction from "../models/Prediction.js"
import User from "../models/User.js"
import jwt from "jsonwebtoken"

const router = express.Router()

// 🧠 Middleware: verify JWT token
function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1]
  if (!token) return res.status(401).json({ message: "No token provided" })

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" })
    req.user = decoded
    next()
  })
}

// 📝 POST - create prediction
router.post("/", verifyToken, async (req, res) => {
  try {
    const { eventName, choice } = req.body
    if (!eventName || !choice) {
      return res.status(400).json({ message: "Missing fields" })
    }

    const prediction = new Prediction({
      user: req.user.id,
      eventName,
      choice
    })
    await prediction.save()

    res.status(201).json({ message: "Prediction saved!", prediction })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
})

// 📋 GET - get all predictions of logged-in user
router.get("/", verifyToken, async (req, res) => {
  try {
    const predictions = await Prediction.find({ user: req.user.id })
    res.json(predictions)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
})

export default router
