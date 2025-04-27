import express from "express"
import User from "../models/User.js"
import { isAuthenticated } from "../middleware/middleware.js"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const router = express.Router()

// Get user profile
router.get("/profile", isAuthenticated, async (req, res, next) => {
  try {
    const user = await User.findById(req.session.user._id).select("-password")

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    res.status(200).json({
      success: true,
      data: user,
    })
  } catch (error) {
    next(error)
  }
})

// Update user profile
router.put("/profile", isAuthenticated, async (req, res, next) => {
  try {
    const upload = req.app.locals.upload

    upload.single("profileImage")(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message })
      }

      try {
        const { username, email } = req.body

        // Check if username or email is already taken
        if (username || email) {
          const existingUser = await User.findOne({
            $and: [
              { _id: { $ne: req.session.user._id } },
              { $or: [{ username: username || "" }, { email: email || "" }] },
            ],
          })

          if (existingUser) {
            // Remove uploaded file if update fails
            if (req.file) {
              fs.unlinkSync(req.file.path)
            }

            return res.status(400).json({
              success: false,
              message: "Username or email is already taken",
            })
          }
        }

        // Get current user
        const user = await User.findById(req.session.user._id)

        if (!user) {
          // Remove uploaded file if update fails
          if (req.file) {
            fs.unlinkSync(req.file.path)
          }

          return res.status(404).json({
            success: false,
            message: "User not found",
          })
        }

        // If new profile image is uploaded, delete the old one
        if (req.file && user.profileImage) {
          const oldImagePath = path.join(__dirname, "..", user.profileImage)
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath)
          }
        }

        // Update user
        user.username = username || user.username
        user.email = email || user.email

        if (req.file) {
          user.profileImage = `/uploads/${req.file.filename}`
        }

        await user.save()

        // Update session
        req.session.user = user.toJSON()

        res.status(200).json({
          success: true,
          message: "Profile updated successfully",
          data: user.toJSON(),
        })
      } catch (error) {
        // Remove uploaded file if update fails
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

// Change password
router.put("/change-password", isAuthenticated, async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body

    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Current password and new password are required",
      })
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "New password must be at least 8 characters long",
      })
    }

    // Get user
    const user = await User.findById(req.session.user._id)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    // Check current password
    const isMatch = await user.comparePassword(currentPassword)

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      })
    }

    // Update password
    user.password = newPassword
    await user.save()

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    })
  } catch (error) {
    next(error)
  }
})

export default router

