const User = require('../models/User');
const Subscription = require('../models/Subscription');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.activatePremium = catchAsync(async (req, res) => {
  const { plan } = req.body;

  if (!['MONTHLY', 'YEARLY'].includes(plan)) {
    throw new AppError('Invalid plan', 400);
  }

  const user = await User.findById(req.user.userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }

  const now = new Date();
  const endDate =
    plan === 'MONTHLY'
      ? new Date(now.setMonth(now.getMonth() + 1))
      : new Date(now.setFullYear(now.getFullYear() + 1));

  user.isPremium = true;
  user.premiumExpiresAt = endDate;
  await user.save();

  await Subscription.create({
    userId: user._id,
    plan,
    price: plan === 'MONTHLY' ? 199 : 999,
    startDate: new Date(),
    endDate,
  });

  res.json({
    success: true,
    message: 'Premium activated (mock)',
    premiumExpiresAt: endDate,
  });
});
