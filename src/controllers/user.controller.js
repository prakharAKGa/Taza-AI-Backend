const User = require('../models/User');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const { getUserFeatures } = require('../utils/features');

/* ======================================================
   GET USER PROFILE
====================================================== */
exports.getProfile = catchAsync(async (req, res) => {
  const user = await User.findById(req.user.userId);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  const features = getUserFeatures(user);

  res.status(200).json({
    success: true,
    user,
    features,
  });
});

/* ======================================================
   UPDATE USER PROFILE
====================================================== */
exports.updateProfile = catchAsync(async (req, res) => {
  const {
    name,
    profileType,
    showDate,
    about,
    contactDetails,
    organizationDetails,
    photoUrl,
  } = req.body;

  const user = await User.findById(req.user.userId);
  if (!user) {
    throw new AppError('User not found', 404);
  }

  const features = getUserFeatures(user);

  /* ---------------- BASIC FIELDS (ALWAYS EDITABLE) ---------------- */

  if (typeof name === 'string') {
    user.name = name.trim();
  }

  if (profileType === 'PERSONAL' || profileType === 'BUSINESS') {
    user.profileType = profileType;
  }

  if (typeof showDate === 'boolean') {
    user.showDate = showDate;
  }

  // Photo update (Flutter URL or multer upload)
  if (req.file?.path) {
    user.photoUrl = req.file.path;
  } else if (typeof photoUrl === 'string') {
    user.photoUrl = photoUrl;
  }

  /* ---------------- LOCKED FIELDS (PREMIUM ONLY) ---------------- */

  const wantsLockedUpdate =
    typeof about === 'string' ||
    typeof contactDetails === 'string' ||
    typeof organizationDetails === 'string';

  if (wantsLockedUpdate && !features.canEditLockedFields) {
    throw new AppError(
      'Upgrade to Premium to edit locked fields',
      403
    );
  }

  if (typeof about === 'string') {
    user.about = about.trim();
  }

  if (typeof contactDetails === 'string') {
    user.contactDetails = contactDetails.trim();
  }

  if (typeof organizationDetails === 'string') {
    user.organizationDetails = organizationDetails.trim();
  }

  /* ---------------- PROFILE COMPLETION LOGIC ---------------- */

  if (user.profileType === 'PERSONAL') {
    user.profileCompleted = Boolean(
      user.name && user.photoUrl
    );
  }

  if (user.profileType === 'BUSINESS') {
    user.profileCompleted = Boolean(
      user.organizationDetails && user.photoUrl
    );
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    user: {
      id: user._id,
      name: user.name,
      phone: user.phone,
      profileType: user.profileType,
      photoUrl: user.photoUrl,
      showDate: user.showDate,
      profileCompleted: user.profileCompleted,
      isPremium: user.isPremium,
    },
    features,
  });
});
