const User = require('../models/User');
const { generateToken } = require('../utils/jwt');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');


exports.sendOtp = catchAsync(async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    throw new AppError('Phone number is required', 400);
  }

  console.log(`📲 Mock OTP for ${phone}: 123456`);

  res.json({
    success: true,
    message: 'OTP sent (mock)',
  });
});


exports.verifyOtp = catchAsync(async (req, res) => {
  const { phone, otp } = req.body;

  if (!phone || !otp) {
    throw new AppError('Phone and OTP are required', 400);
  }

  if (!/^\d{6}$/.test(otp)) {
    throw new AppError('Invalid OTP format', 400);
  }

  let user = await User.findOne({ phone });

  if (!user) {
    user = await User.create({ phone });
  }

  const token = generateToken({
    userId: user._id,
    phone: user.phone,
  });

  res.json({
    success: true,
    token,
    user,
  });
});
