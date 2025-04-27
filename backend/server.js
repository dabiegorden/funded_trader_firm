import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import session from "express-session"
import MongoStore from "connect-mongo"
import dotenv from "dotenv"
import multer from "multer"
import path from "path"
import { fileURLToPath } from "url"
import fs from "fs"

// Import routes
import authRoutes from "./routes/auth.js"
import challengeRoutes from "./routes/challenge.js"
import paymentRoutes from "./routes/payment.js"
import userRoutes from "./routes/users.js"

// Load environment variables
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Initialize express app
const app = express()
const PORT = process.env.PORT || 5000

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, "uploads")
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    const ext = path.extname(file.originalname)
    cb(null, file.fieldname + "-" + uniqueSuffix + ext)
  },
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error("Only image files are allowed!"), false)
    }
    cb(null, true)
  },
})

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/uploads", express.static(path.join(__dirname, "uploads")))

// Session configuration
// Validate session secret in production
if (process.env.NODE_ENV === 'production' && (!process.env.SESSION_SECRET || process.env.SESSION_SECRET === 'your-secret-key')) {
  console.error('WARNING: Proper SESSION_SECRET not set in production environment');
  // Optionally: process.exit(1);
}

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      ttl: 14 * 24 * 60 * 60, 
      autoRemove: "native",
      touchAfter: 24 * 3600 
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 14 * 24 * 60 * 60 * 1000, 
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      // domain: '.yourdomain.com' // Uncomment if needed for cross-subdomain functionality
    },
    name: 'propfirm.sid', // Custom name makes it harder to identify the session technology
  }),
);

// Make upload middleware available globally
app.locals.upload = upload

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/challenges", challengeRoutes)
app.use("/api/payments", paymentRoutes)
app.use("/api/users", userRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  })
})

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB")
    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err)
    process.exit(1)
  })

export default app
