import mongoose from "mongoose"

const ChallengeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },
    type: {
      type: String,
      enum: ["1step", "2step", "instant", "evaluation"],
      required: true,
    },
    category: {
      type: String,
      enum: ["synthetic", "forex", "crypto", "stocks", "indices"],
      required: true,
    },
    accountSize: {
      type: String,
      enum: ["$5K", "$10K", "$25K", "$50K", "$100K", "$200K", "$300K"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discountCode: {
      type: String,
      default: null,
    },
    discountAmount: {
      type: Number,
      default: 0,
    },
    platform: {
      type: String,
      enum: ["mt4", "mt5", "ctrader"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "active", "paused", "completed", "failed", "canceled", "refunded"],
      default: "pending",
      index: true
    },
    paymentDetails: {
      paymentId: String,
      paymentMethod: {
        type: String,
        enum: ["credit_card", "paypal", "crypto", "bank_transfer"],
        default: null
      },
      paymentDate: Date,
      invoiceNumber: String
    },
    tradingCredentials: {
      login: String,
      password: {
        type: String,
        select: false // Don't include password in query results by default
      },
      server: String,
      sentAt: Date,
      expiresAt: Date
    },
    objectives: {
      profitTarget: {
        type: Number,
        default: 10 // 10% profit target by default
      },
      maxDailyDrawdown: {
        type: Number,
        default: 5 // 5% max daily drawdown
      },
      maxTotalDrawdown: {
        type: Number,
        default: 10 // 10% max total drawdown
      },
      minTradingDays: {
        type: Number,
        default: 5
      }
    },
    metrics: {
      balance: {
        type: Number,
        default: 0,
      },
      equity: {
        type: Number,
        default: 0,
      },
      drawdown: {
        type: Number, // current drawdown
        default: 0,
      },
      maxDrawdown: {
        type: Number, // historical max drawdown
        default: 0,
      },
      profit: {
        type: Number,
        default: 0,
      },
      winRate: {
        type: Number,
        default: 0,
      },
      totalTrades: {
        type: Number,
        default: 0,
      },
      profitFactor: {
        type: Number, 
        default: 0,
      },
      lastUpdated: {
        type: Date,
        default: Date.now,
      },
    },
    trades: [{
      orderId: String,
      symbol: String,
      direction: {
        type: String,
        enum: ["buy", "sell"]
      },
      openPrice: Number,
      closePrice: Number,
      openTime: Date,
      closeTime: Date,
      profit: Number,
      volume: Number
    }],
    phase: {
      type: Number,
      default: 1
    },
    phaseHistory: [{
      phase: Number,
      startDate: Date,
      endDate: Date,
      result: {
        type: String,
        enum: ["passed", "failed", "in_progress"]
      },
      metrics: {
        finalBalance: Number,
        maxDrawdown: Number,
        totalTrades: Number,
        winRate: Number
      }
    }],
    notes: {
      type: String,
      maxlength: 500
    },
    isArchived: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true, // This handles createdAt and updatedAt
  }
)

// Virtual for calculating days remaining (if challenge has expiration)
ChallengeSchema.virtual('daysRemaining').get(function() {
  if (this.tradingCredentials?.expiresAt) {
    const now = new Date();
    const expiresAt = new Date(this.tradingCredentials.expiresAt);
    const diffTime = expiresAt - now;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
  return null;
});

// Instance method to check if challenge is active
ChallengeSchema.methods.isActive = function() {
  return this.status === 'active';
};

// Instance method to update challenge metrics
ChallengeSchema.methods.updateMetrics = async function(metricsData) {
  this.metrics = {
    ...this.metrics,
    ...metricsData,
    lastUpdated: new Date()
  };
  
  // Check if objectives are met for completion
  if (this.metrics.profit >= this.objectives.profitTarget && 
      this.metrics.maxDrawdown <= this.objectives.maxTotalDrawdown) {
    if (this.type === '2step' && this.phase === 1) {
      // Move to phase 2 if 2step challenge
      this.phaseHistory.push({
        phase: 1,
        startDate: this.createdAt,
        endDate: new Date(),
        result: 'passed',
        metrics: {
          finalBalance: this.metrics.balance,
          maxDrawdown: this.metrics.maxDrawdown,
          totalTrades: this.metrics.totalTrades,
          winRate: this.metrics.winRate
        }
      });
      this.phase = 2;
      // Reset metrics as needed for phase 2
    } else {
      // Complete the challenge
      this.status = 'completed';
    }
  }
  
  await this.save();
  return this;
};

// Index for faster queries
ChallengeSchema.index({ user: 1, status: 1 });
ChallengeSchema.index({ 'paymentDetails.paymentId': 1 });
ChallengeSchema.index({ createdAt: -1 });

const Challenge = mongoose.models.Challenge || mongoose.model("Challenge", ChallengeSchema);

export default Challenge;