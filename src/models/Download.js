const mongoose = require('mongoose');

const downloadSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },

   
    imageUrl: {
      type: String,
      required: true,
    },

  
    isBranded: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Download', downloadSchema);
