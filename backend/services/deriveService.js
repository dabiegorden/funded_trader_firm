import WebSocket from "ws"
import dotenv from "dotenv"
import nodemailer from "nodemailer"
import User from "../models/User.js"

dotenv.config()

const DERIV_APP_ID = process.env.DERIV_APP_ID
const DERIV_API_TOKEN = process.env.DERIV_API_TOKEN

// Email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

// Send a request to Deriv API and wait for response
const sendDerivRequest = (request) => {
  return new Promise((resolve, reject) => {
    // Create a new WebSocket connection with app_id as query parameter
    const socket = new WebSocket(`wss://ws.derivws.com/websockets/v3?app_id=${DERIV_APP_ID}`)

    // Add a unique request ID
    const requestId = Date.now()
    request.req_id = requestId

    // Event handler for when the WebSocket connection is opened
    socket.onopen = () => {
      console.log("[open] Connection established with Deriv API")
      // Send the request
      socket.send(JSON.stringify(request))
    }

    // Event handler for when a message is received from the server
    socket.onmessage = (event) => {
      try {
        const response = JSON.parse(event.data)

        // Check if this is the response to our request
        if (response.req_id === requestId) {
          // Close the socket as we got our response
          socket.close()

          if (response.error) {
            reject(new Error(response.error.message || "Unknown Deriv API error"))
          } else {
            resolve(response)
          }
        }
      } catch (error) {
        socket.close()
        reject(new Error("Failed to parse Deriv API response"))
      }
    }

    // Event handler for when the WebSocket connection is closed
    socket.onclose = (event) => {
      if (!event.wasClean) {
        reject(new Error(`Connection closed unexpectedly, code=${event.code}`))
      }
    }

    // Event handler for when an error occurs with the WebSocket connection
    socket.onerror = (error) => {
      console.error(`[error] ${error.message}`)
      reject(new Error("WebSocket connection error"))
    }

    // Set a timeout to prevent hanging connections
    setTimeout(() => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close()
        reject(new Error("Request timeout"))
      }
    }, 30000) // 30 seconds timeout
  })
}

// Generate trading credentials
export const sendTradingCredentials = async (userId, challengeType, category, accountSize, platform) => {
  try {
    // Get user details
    const user = await User.findById(userId)

    if (!user) {
      throw new Error("User not found")
    }

    // Parse account size value from string (e.g., "$10K" to 10000)
    const accountSizeValue = Number.parseInt(accountSize.replace("$", "").replace("K", "000"))

    // Step 1: Authenticate with API token
    const authResponse = await sendDerivRequest({
      authorize: DERIV_API_TOKEN,
    })

    if (!authResponse.authorize) {
      throw new Error("Authentication with Deriv API failed")
    }

    // Step 2: Create virtual account (if needed for demo/evaluation)
    // This step might be optional depending on your business logic
    const virtualAccountResponse = await sendDerivRequest({
      new_account_virtual: 1,
      client_password: generateSecurePassword(),
      residence: "default", // Set appropriate default or get from user
      account_type: "trading",
      email: user.email,
      verification_code: "internal", // For testing - in production you'd need proper verification
    })

    // Step 3: Create MT4/MT5 account
    const mtRequest = {
      // Use the appropriate MT4/MT5 account creation endpoint
      [platform === "mt5" ? "mt5_new_account" : "mt4_new_account"]: {
        account_type: category === "forex" ? "financial" : "synthetic",
        leverage: determineLeverage(accountSizeValue),
        name: `${user.username}_${accountSize}_${challengeType}`,
        // For MT5, we need to specify additional parameters
        ...(platform === "mt5"
          ? {
              account_type: category === "forex" ? "financial" : "synthetic",
              mt5_account_type: category === "forex" ? "financial" : "synthetic",
              server: category === "forex" ? "Deriv-Server-01" : "Deriv-Synthetic-01",
            }
          : {}),
      },
    }

    const mtAccountResponse = await sendDerivRequest(mtRequest)

    // Extract account details from the response
    const accountDetails = platform === "mt5" ? mtAccountResponse.mt5_new_account : mtAccountResponse.mt4_new_account

    if (!accountDetails) {
      throw new Error(`Failed to create ${platform.toUpperCase()} account`)
    }

    const { login, password, server } = accountDetails

    // Send email with credentials
    await sendCredentialsEmail(
      user.email,
      user.username,
      login,
      password,
      server,
      platform,
      accountSize,
      challengeType,
      category,
    )

    return {
      login,
      password,
      server,
    }
  } catch (error) {
    console.error("Deriv API error:", error.message)
    throw new Error(`Failed to generate trading credentials: ${error.message}`)
  }
}

// Generate a secure password
const generateSecurePassword = () => {
  const length = 12
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()"
  let password = ""

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length)
    password += charset[randomIndex]
  }

  return password
}

// Determine appropriate leverage based on account size
const determineLeverage = (accountSize) => {
  if (accountSize <= 10000) return 500
  if (accountSize <= 50000) return 200
  if (accountSize <= 100000) return 100
  return 50 // For larger accounts
}

// Send email with trading credentials
const sendCredentialsEmail = async (
  email,
  username,
  login,
  password,
  server,
  platform,
  accountSize,
  challengeType,
  category,
) => {
  try {
    const platformName = platform === "mt4" ? "MetaTrader 4" : "MetaTrader 5"
    const challengeName = challengeType === "1step" ? "1 Step Fortune" : "Instant Funding"
    const categoryName = category === "synthetic" ? "Synthetic Indices" : "Forex"

    const mailOptions = {
      from: `"PropFirm Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Your ${platformName} Trading Credentials - ${accountSize} ${categoryName} Account`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #3b82f6;">Your Trading Account is Ready!</h2>
          <p>Hello ${username},</p>
          <p>Congratulations on your ${challengeName} ${accountSize} ${categoryName} account purchase! Your trading credentials are ready.</p>
          
          <div style="background-color: #f8fafc; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #334155;">Your ${platformName} Login Details:</h3>
            <p><strong>Login ID:</strong> ${login}</p>
            <p><strong>Password:</strong> ${password}</p>
            <p><strong>Server:</strong> ${server}</p>
          </div>
          
          <p>Please keep these credentials secure. You can use them to log in to your ${platformName} platform.</p>
          
          <p>If you need any assistance, please don't hesitate to contact our support team.</p>
          
          <p>Happy Trading!</p>
          <p>The PropFirm Team</p>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)

    return true
  } catch (error) {
    console.error("Email sending error:", error)
    throw new Error("Failed to send credentials email")
  }
}

