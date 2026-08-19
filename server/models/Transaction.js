const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  fromAccount: {
    type: String,
    required: true,
    index: true
  },
  toAccount: {
    type: String,
    required: true,
    index: true
  },
  fromUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  toUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  amount: {
    type: Number,
    required: true,
    min: [0.01, 'Transfer amount must be greater than 0']
  },
  status: {
    type: String,
    enum: ['success', 'failed'],
    default: 'success'
  },
  failureReason: {
    type: String
  },
  description: {
    type: String,
    default: 'Money Transfer'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);
