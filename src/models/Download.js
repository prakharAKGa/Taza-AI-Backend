const mongoose = require('mongoose');

const downloadSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    imageUrl: String,
    isBranded: Boolean, 
  },
  { timestamps: true }
);

module.exports = mongoose.model('Download', downloadSchema);
