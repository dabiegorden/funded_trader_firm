import axios from "axios"
import crypto from "crypto"
import Payment from "../models/Payment.js"
import dotenv from "dotenv"

dotenv.config()

const NOWPAYMENTS_API_KEY = process.env.NOWPAYMENTS_API_KEY
const NOWPAYMENTS_IPN_SECRET = process.env.NOWPAYMENTS_IPN_SECRET
const NOWPAYMENTS_API_URL = "https://api.nowpayments.io/v1"

// Create a payment
export const createPayment = async (userId, challengeId, amount) => {
  try {
    // Create payment in NOWPayments
    const response = await axios.post(
      `${NOWPAYMENTS_API_URL}/payment`,
      {
        price_amount: amount,
        price_currency: "USD",
        pay_currency: "USDT",
        ipn_callback_url: `${process.env.BACKEND_URL}/api/payments/ipn`,
        order_id: challengeId.toString(),
        order_description: `PropFirm Challenge Payment - ${challengeId}`,
      },
      {
        headers: {
          "x-api-key": NOWPAYMENTS_API_KEY,
          "Content-Type": "application/json",
        },
      },
    )

    const { payment_id, pay_address, payment_status, pay_amount, pay_currency } = response.data

    // Create payment record in database
    const payment = new Payment({
      user: userId,
      challenge: challengeId,
      paymentId: payment_id,
      amount: pay_amount,
      currency: pay_currency,
      status: payment_status,
      paymentUrl: `https://nowpayments.io/payment/?iid=${payment_id}`,
    })

    await payment.save()

    return {
      paymentId: payment_id,
      paymentUrl: `https://nowpayments.io/payment/?iid=${payment_id}`,
    }
  } catch (error) {
    console.error("Payment creation error:", error.response?.data || error.message)
    throw new Error("Failed to create payment")
  }
}

// Verify IPN signature
export const verifyPayment = (ipnData) => {
  try {
    const { payment_id, payment_status, pay_address, price_amount, price_currency, ipn_secret } = ipnData

    // Create the string to sign
    const sortedData = {
      payment_id,
      payment_status,
      pay_address,
      price_amount,
      price_currency,
    }

    const stringToSign = JSON.stringify(sortedData)

    // Create HMAC signature
    const hmac = crypto.createHmac("sha512", NOWPAYMENTS_IPN_SECRET)
    const signature = hmac.update(stringToSign).digest("hex")

    // Compare signatures
    return signature === ipn_secret
  } catch (error) {
    console.error("Payment verification error:", error)
    return false
  }
}

// Check payment status
export const checkPaymentStatus = async (paymentId) => {
  try {
    const response = await axios.get(`${NOWPAYMENTS_API_URL}/payment/${paymentId}`, {
      headers: {
        "x-api-key": NOWPAYMENTS_API_KEY,
      },
    })

    return response.data
  } catch (error) {
    console.error("Payment status check error:", error.response?.data || error.message)
    throw new Error("Failed to check payment status")
  }
}

