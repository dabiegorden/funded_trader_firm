import express from "express"
import User from "../models/User.js"
import fs from "fs"

const router = express.Router()

// Register a new user
router.post("/register", async (req, res, next) => {
  try {
    const upload = req.app.locals.upload

    // Handle file upload
    upload.single("profileImage")(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message })
      }

      try {
        const { username, email, password } = req.body

        // Check if user already exists
        const existingUser = await User.findOne({
          $or: [{ email }, { username }],
        })

        if (existingUser) {
          // Remove uploaded file if user creation fails
          if (req.file) {
            fs.unlinkSync(req.file.path)
          }

          return res.status(400).json({
            success: false,
            message: "User with this email or username already exists",
          })
        }

        // Create new user
        const user = new User({
          username,
          email,
          password,
          profileImage: req.file ? `/uploads/${req.file.filename}` : "",
        })

        await user.save()

        res.status(201).json({
          success: true,
          message: "User registered successfully",
          user: user.toJSON(),
        })
      } catch (error) {
        // Remove uploaded file if user creation fails
        if (req.file) {
          fs.unlinkSync(req.file.path)
        }
        next(error)
      }
    })
  } catch (error) {
    next(error)
  }
})

// Login user - Update to fix authentication issues
router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body

    // Find user by username
    const user = await User.findOne({ username })

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      })
    }

    // Check password
    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password",
      })
    }

    // Set user in session
    req.session.user = user.toJSON()

    // Save the session explicitly to ensure it's stored before responding
    req.session.save((err) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Failed to create session",
          error: err.message,
        })
      }

      // Return success response with user data
      res.status(200).json({
        success: true,
        message: "Login successful",
        user: user.toJSON(),
      })
    })
  } catch (error) {
    console.error("Login error:", error)
    next(error)
  }
})

// Logout user - Update to ensure proper session destruction
router.post("/logout", (req, res) => {
  if (!req.session || !req.session.user) {
    return res.status(200).json({
      success: true,
      message: "Already logged out",
    })
  }

  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to logout",
        error: err.message,
      })
    }

    res.clearCookie("connect.sid")
    res.status(200).json({
      success: true,
      message: "Logout successful",
    })
  })
})

// Get current user - Update to improve error handling
router.get("/getCurrentUser", (req, res) => {
  if (req.session && req.session.user) {
    return res.status(200).json({
      success: true,
      user: req.session.user,
    })
  }

  res.status(401).json({
    success: false,
    message: "Not authenticated",
  })
})

export default router
