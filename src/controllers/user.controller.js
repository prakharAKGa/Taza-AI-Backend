const User = require('../models/User');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const { getUserFeatures } = require('../utils/features');


exports.getProfile = catchAsync(async (req, res) => {
  const user = await User.findById(req.user.userId);

  if (!user) {
    throw new AppError('User not found', 404);
  }

  const features = getUserFeatures(user);

  res.json({
    success: true,
    user,
    features,
  });
});


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



  if (name) user.name = name;
  if (profileType) user.profileType = profileType;

  if (typeof showDate !== 'undefined') {
    user.showDate = showDate;
  }


  if (req.file?.path) {
    user.photoUrl = req.file.path;
  }

  if (photoUrl) {
    user.photoUrl = photoUrl;
  }



  if (about || contactDetails || organizationDetails) {
    if (!features.canEditLockedFields) {
      throw new AppError(
        'Upgrade to Premium to edit locked fields',
        403
      );
    }

    if (about) user.about = about;
    if (contactDetails) user.contactDetails = contactDetails;
    if (organizationDetails)
      user.organizationDetails = organizationDetails;
  }

  if (user.profileType === 'PERSONAL') {
    if (user.name && user.photoUrl) {
      user.profileCompleted = true;
    }
  }


  if (user.profileType === 'BUSINESS') {
    if (user.organizationDetails && user.photoUrl) {
      user.profileCompleted = true;
    }
  }

  await user.save();

  res.json({
    success: true,
    message: 'Profile updated successfully',
    user: {
      profileType: user.profileType,
      profileCompleted: user.profileCompleted,
    },
    features,
  });
});
