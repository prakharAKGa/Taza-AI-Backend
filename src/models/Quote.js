const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      enum: [
        'GOOD_MORNING',
        'MOTIVATIONAL',
        'SHAYARI',
        'RELIGIOUS',
        'LOVE',
        'FESTIVAL',
      ],
    },
    textHindi: {
      type: String,
      required: true,
    },
    templateImageUrl: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Quote', quoteSchema);
