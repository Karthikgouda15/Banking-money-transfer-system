const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  accountNumber: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  accountType: {
    type: String,
    enum: ['savings', 'checking', 'business'],
    default: 'savings'
  },
  balance: {
    type: Number,
    required: true,
    min: [0, 'Balance cannot be negative'],
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Account', accountSchema);
