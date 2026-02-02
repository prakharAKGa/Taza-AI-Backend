const mongoose = require('mongoose');

const subscriptionPlanSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      enum: ['MONTHLY', 'YEARLY'],
      unique: true,
      required: true,
    },
    title: String,
    price: Number,
    durationInDays: Number,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SubscriptionPlan', subscriptionPlanSchema);
