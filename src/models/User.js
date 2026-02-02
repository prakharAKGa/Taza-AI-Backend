const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
    },

    name: String,

    profileType: {
      type: String,
      enum: ['PERSONAL', 'BUSINESS'],
      default: null,
    },

    photoUrl: String,

    about: String,
    contactDetails: String,
    organizationDetails: String,

    profileCompleted: {
      type: Boolean,
      default: false,
    },

    isPremium: {
      type: Boolean,
      default: false,
    },
    premiumExpiresAt: Date,

    showDate: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
