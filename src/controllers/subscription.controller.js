const Subscription = require('../models/Subscription');
const SubscriptionPlan = require('../models/SubscriptionPlan');
const User = require('../models/User');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

/* ---------------- GET PLANS ---------------- */

exports.getPlans = catchAsync(async (req, res) => {
  const plans = await SubscriptionPlan.find({ isActive: true });

  res.json({
    success: true,
    plans,
  });
});

/* ---------------- ACTIVATE PREMIUM ---------------- */

exports.activatePremium = catchAsync(async (req, res) => {
  const { planKey } = req.body;
  const userId = req.user.userId;

  const plan = await SubscriptionPlan.findOne({ key: planKey });
  if (!plan) throw new AppError('Invalid plan', 400);

  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + plan.durationInDays);

  await Subscription.create({
    userId,
    plan: plan.key,
    price: plan.price,
    startDate,
    endDate,
  });

  await User.findByIdAndUpdate(userId, {
    isPremium: true,
    premiumExpiresAt: endDate,
  });

  res.json({
    success: true,
    message: 'Premium activated',
    expiresAt: endDate,
  });
});
