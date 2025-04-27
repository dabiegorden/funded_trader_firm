import mongoose from "mongoose"

const PaymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    challenge: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Challenge",
      required: true,
      index: true
    },
    paymentId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "USDT",
      enum: ["USDT", "BTC", "ETH", "USD", "EUR", "GBP"]
    },
    originalAmount: {
      type: Number,
    },
    originalCurrency: {
      type: String,
    },
    exchangeRate: {
      type: Number,
    },
    paymentMethod: {
      type: String,
      enum: ["crypto", "credit_card", "paypal", "bank_transfer", "apple_pay", "google_pay"],
      required: true
    },
    paymentProcessor: {
      type: String,
      enum: ["nowpayments", "stripe", "paypal", "coinbase", "manual"],
      required: true
    },
    status: {
      type: String,
      enum: [
        "pending", 
        "confirming", 
        "confirmed", 
        "sending", 
        "partially_paid", 
        "finished", 
        "expired",
        "failed", 
        "refunded",
        "disputed",
        "cancelled"
      ],
      default: "pending",
      index: true
    },
    paymentUrl: String,
    paymentDetails: {
      walletAddress: String,
      txHash: String,
      cardLast4: String,
      paypalEmail: String,
      accountName: String
    },
    ipnCallbacks: [
      {
        timestamp: {
          type: Date,
          default: Date.now
        },
        status: String,
        data: mongoose.Schema.Types.Mixed,
        ipAddress: String,
        processorId: String
      },
    ],
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    notes: {
      type: String,
      maxlength: 500
    },
    refundDetails: {
      refundedAt: Date,
      refundAmount: Number,
      refundReason: String,
      refundedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      refundTxHash: String
    },
    invoice: {
      invoiceNumber: String,
      invoiceDate: Date,
      billingAddress: {
        name: String,
        address1: String,
        address2: String,
        city: String,
        state: String,
        country: String,
        postalCode: String
      }
    },
    expiresAt: {
      type: Date
    },
    completedAt: {
      type: Date
    },
    isArchived: {
      type: Boolean, 
      default: false
    }
  },
  {
    timestamps: true, // This handles createdAt and updatedAt
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

// Virtual for payment age in minutes
PaymentSchema.virtual('ageInMinutes').get(function() {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60));
});

// Virtual for checking if payment is expired
PaymentSchema.virtual('isExpired').get(function() {
  if (this.expiresAt) {
    return new Date() > this.expiresAt;
  }
  // Default expiration of 60 minutes if not explicitly set
  return this.ageInMinutes > 60;
});

// Method to mark payment as completed
PaymentSchema.methods.markAsCompleted = async function() {
  if (this.status !== 'finished') {
    this.status = 'finished';
    this.completedAt = new Date();
    
    // Update the associated challenge status
    if (this.challenge) {
      const Challenge = mongoose.model('Challenge');
      const challenge = await Challenge.findById(this.challenge);
      if (challenge) {
        challenge.status = 'paid';
        await challenge.save();
      }
    }
    
    await this.save();
  }
  return this;
};

// Method to process refund
PaymentSchema.methods.processRefund = async function(refundDetails) {
  this.status = 'refunded';
  this.refundDetails = {
    ...refundDetails,
    refundedAt: new Date()
  };
  
  // Update the associated challenge
  if (this.challenge) {
    const Challenge = mongoose.model('Challenge');
    const challenge = await Challenge.findById(this.challenge);
    if (challenge) {
      challenge.status = 'refunded';
      await challenge.save();
    }
  }
  
  await this.save();
  return this;
};

// Method to add IPN callback
PaymentSchema.methods.addIpnCallback = async function(status, data, ipAddress, processorId) {
  this.ipnCallbacks.push({
    timestamp: new Date(),
    status,
    data,
    ipAddress,
    processorId
  });
  
  // Update payment status based on IPN
  if (status && ['confirmed', 'finished', 'failed', 'refunded'].includes(status)) {
    this.status = status;
    
    if (status === 'finished') {
      this.completedAt = new Date();
    }
  }
  
  await this.save();
  return this;
};

// Static method to get payments by status
PaymentSchema.statics.getPaymentsByStatus = function(status) {
  return this.find({ status }).sort({ createdAt: -1 });
};

// Static method to find recent payments for a user
PaymentSchema.statics.findRecentByUser = function(userId, limit = 10) {
  return this.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate('challenge', 'type accountSize platform');
};

// Add indexes for common queries
PaymentSchema.index({ user: 1, createdAt: -1 });
PaymentSchema.index({ status: 1, createdAt: -1 });
PaymentSchema.index({ 'paymentDetails.txHash': 1 });
PaymentSchema.index({ 'invoice.invoiceNumber': 1 });

// Compound index for filtered reports
PaymentSchema.index({ paymentMethod: 1, status: 1, createdAt: -1 });

const Payment = mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);

export default Payment;