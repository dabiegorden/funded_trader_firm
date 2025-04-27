import express from "express"
import Payment from "../models/Payment.js"
import Challenge from "../models/Challenge.js"
import { isAuthenticated } from "../middleware/middleware.js"
import { verifyPayment } from "../services/paymentService.js"
import { sendTradingCredentials } from "../services/deriveService.js"

const router = express.Router()

// Get all payments for current user
router.get("/", isAuthenticated, async (req, res, next) => {
  try {
    const payments = await Payment.find({ user: req.session.user._id })

    res.status(200).json({
      success: true,
      count: payments.length,
      data: payments,
    })
  } catch (error) {
    next(error)
  }
})

// Get payment status
router.get("/:paymentId/status", isAuthenticated, async (req, res, next) => {
  try {
    const payment = await Payment.findOne({
      paymentId: req.params.paymentId,
      user: req.session.user._id,
    })

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      })
    }

    res.status(200).json({
      success: true,
      data: {
        paymentId: payment.paymentId,
        status: payment.status,
        amount: payment.amount,
        currency: payment.currency,
      },
    })
  } catch (error) {
    next(error)
  }
})

// NOWPayments IPN (Instant Payment Notification) webhook
router.post("/ipn", async (req, res, next) => {
  try {
    const ipnData = req.body

    // Verify the IPN data signature
    const isValid = verifyPayment(ipnData)

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid IPN signature",
      })
    }

    const { payment_id, payment_status, price_amount } = ipnData

    // Find the payment
    const payment = await Payment.findOne({ paymentId: payment_id })

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      })
    }

    // Update payment status
    payment.status = payment_status
    payment.ipnCallbacks.push({
      timestamp: Date.now(),
      status: payment_status,
      data: ipnData,
    })

    await payment.save()

    // If payment is finished, update challenge status and send trading credentials
    if (payment_status === "finished") {
      const challenge = await Challenge.findById(payment.challenge)

      if (challenge) {
        challenge.status = "paid"
        await challenge.save()

        // Send trading credentials
        const credentials = await sendTradingCredentials(
          challenge.user,
          challenge.type,
          challenge.category,
          challenge.accountSize,
          challenge.platform,
        )

        if (credentials) {
          challenge.tradingCredentials = {
            login: credentials.login,
            password: credentials.password,
            server: credentials.server,
            sentAt: Date.now(),
          }
          challenge.status = "active"
          await challenge.save()
        }
      }
    }

    res.status(200).json({ success: true })
  } catch (error) {
    next(error)
  }
})

export default router

