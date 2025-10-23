import express from "express"
import User from "../models/User.js"

const router = express.Router()

// GET /api/leaderboard → get top users by points
router.get("/", async (req, res) => {
  try {
    const users = await User.find()
      .sort({ points: -1 })
      .select("username points -_id")

    res.json(users)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Failed to fetch leaderboard" })
  }
})

export default router
