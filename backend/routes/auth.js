import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

const router = express.Router()

// 📝 REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body

    const existingUser = await User.findOne({ username })
    if (existingUser) return res.status(400).json({ message: "Username already exists." })

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({ username, password: hashedPassword })
    await newUser.save()

    // ✅ create JWT token
    const token = jwt.sign(
      { id: newUser._id, username: newUser.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )

    res.json({
      message: "Registration successful!",
      token,
      username: newUser.username,
    })
  } catch (err) {
    res.status(500).json({ message: "Registration failed." })
  }
})


// 🔑 LOGIN
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    if (!user) return res.status(400).json({ message: "User not found." })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ message: "Invalid password." })

    // sign JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    )

    res.json({
      message: "Login successful.",
      token,
      username: user.username,
      points: user.points
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: "Server error." })
  }
})

export default router
