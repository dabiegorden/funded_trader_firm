import express from "express"
import Challenge from "../models/Challenge.js"
import User from "../models/User.js";
import { isAuthenticated } from "../middleware/middleware.js"
import { createPayment } from "../services/paymentService.js"

const router = express.Router()

// Get all challenges for current user
router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const challenges = await Challenge.find({ user: req.session.user._id })

    res.status(200).json({
      success: true,
      count: challenges.length,
      data: challenges,
    })
  } catch (error) {
    next(error)
  }
})

// Get single challenge
router.get("/:id", isAuthenticated, async (req, res, next) => {
  try {
    const challenge = await Challenge.findOne({
      _id: req.params.id,
      user: req.session.user._id,
    })

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: "Challenge not found",
      })
    }

    res.status(200).json({
      success: true,
      data: challenge,
    })
  } catch (error) {
    next(error)
  }
})

// Create new challenge
router.post("/", isAuthenticated, async (req, res, next) => {
  try {
    const { type, category, accountSize, price, platform } = req.body

    // Create challenge
    const challenge = new Challenge({
      user: req.session.user._id,
      type,
      category,
      accountSize,
      price,
      platform,
      status: "pending",
    })

    await challenge.save()

    // Create payment for the challenge
    const payment = await createPayment(req.session.user._id, challenge._id, price)

    // Update challenge with payment ID
    challenge.paymentId = payment.paymentId
    await challenge.save()

    // Add challenge to user
    await User.findByIdAndUpdate(req.session.user._id, { $push: { challenges: challenge._id } })

    res.status(201).json({
      success: true,
      data: challenge,
      payment: {
        paymentId: payment.paymentId,
        paymentUrl: payment.paymentUrl,
      },
    })
  } catch (error) {
    next(error)
  }
})

// Update challenge metrics
router.put("/:id/metrics", isAuthenticated, async (req, res, next) => {
  try {
    const { balance, equity, drawdown, profit } = req.body

    const challenge = await Challenge.findOne({
      _id: req.params.id,
      user: req.session.user._id,
    })

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: "Challenge not found",
      })
    }

    // Update metrics
    challenge.metrics = {
      balance: balance || challenge.metrics.balance,
      equity: equity || challenge.metrics.equity,
      drawdown: drawdown || challenge.metrics.drawdown,
      profit: profit || challenge.metrics.profit,
      lastUpdated: Date.now(),
    }

    await challenge.save()

    res.status(200).json({
      success: true,
      data: challenge,
    })
  } catch (error) {
    next(error)
  }
})

export default router

