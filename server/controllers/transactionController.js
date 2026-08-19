const mongoose = require('mongoose');
const Account = require('../models/Account');
const Transaction = require('../models/Transaction');

// @desc Transfer money between accounts atomically
// @route POST /api/transactions/transfer
exports.transferMoney = async (req, res, next) => {
  const { fromAccount, toAccount, amount, description } = req.body;
  const transferAmount = Number(amount);

  // 1. Validation checks
  if (!fromAccount || !toAccount) {
    return res.status(400).json({
      success: false,
      message: 'Both sender (fromAccount) and recipient (toAccount) account numbers are required.'
    });
  }

  if (isNaN(transferAmount) || transferAmount <= 0) {
    return res.status(400).json({
      success: false,
      message: 'Transfer amount must be a positive number greater than 0.'
    });
  }

  if (fromAccount.trim().toUpperCase() === toAccount.trim().toUpperCase()) {
    return res.status(400).json({
      success: false,
      message: 'Cannot transfer funds to the same account.'
    });
  }

  // Find sender account & verify user ownership
  const senderAccount = await Account.findOne({ accountNumber: fromAccount.trim() });
  if (!senderAccount) {
    return res.status(404).json({
      success: false,
      message: 'Sender account not found.'
    });
  }

  if (senderAccount.userId.toString() !== req.user.id) {
    return res.status(403).json({
      success: false,
      message: 'Unauthorized. You do not own the sender account.'
    });
  }

  // Find recipient account
  const recipientAccount = await Account.findOne({ accountNumber: toAccount.trim() });
  if (!recipientAccount) {
    return res.status(404).json({
      success: false,
      message: 'Recipient account number does not exist.'
    });
  }

  // Check sender balance (Server-Side Validation)
  if (senderAccount.balance < transferAmount) {
    // Record failed transaction log
    await Transaction.create({
      fromAccount: senderAccount.accountNumber,
      toAccount: recipientAccount.accountNumber,
      fromUserId: senderAccount.userId,
      toUserId: recipientAccount.userId,
      amount: transferAmount,
      status: 'failed',
      failureReason: 'Insufficient funds',
      description: description || 'Fund Transfer'
    });

    return res.status(400).json({
      success: false,
      message: `Insufficient balance. Available: ₹${senderAccount.balance.toLocaleString('en-IN')}, Requested: ₹${transferAmount.toLocaleString('en-IN')}`
    });
  }

  // Execute transfer inside MongoDB Transaction Session (or fallback for standalone local mongod)
  let session = null;
  let isTransactionSupported = true;

  try {
    session = await mongoose.startSession();
    session.startTransaction();
  } catch (err) {
    // If standalone mongo without replica set
    isTransactionSupported = false;
    if (session) {
      session.endSession();
      session = null;
    }
  }

  try {
    if (isTransactionSupported && session) {
      // 1. Debit sender
      const updatedSender = await Account.findOneAndUpdate(
        { _id: senderAccount._id, balance: { $gte: transferAmount } },
        { $inc: { balance: -transferAmount } },
        { new: true, session }
      );

      if (!updatedSender) {
        throw new Error('Insufficient balance or concurrent modification detected.');
      }

      // 2. Credit recipient
      await Account.findOneAndUpdate(
        { _id: recipientAccount._id },
        { $inc: { balance: transferAmount } },
        { new: true, session }
      );

      // 3. Create transaction record
      const [transaction] = await Transaction.create(
        [
          {
            fromAccount: senderAccount.accountNumber,
            toAccount: recipientAccount.accountNumber,
            fromUserId: senderAccount.userId,
            toUserId: recipientAccount.userId,
            amount: transferAmount,
            status: 'success',
            description: description || 'Fund Transfer'
          }
        ],
        { session }
      );

      await session.commitTransaction();
      session.endSession();

      return res.status(200).json({
        success: true,
        message: `Successfully transferred ₹${transferAmount.toLocaleString('en-IN')} to account ${toAccount}.`,
        transaction,
        updatedSenderBalance: updatedSender.balance
      });
    } else {
      // Fallback for standalone MongoDB local instance without replica set
      const updatedSender = await Account.findOneAndUpdate(
        { _id: senderAccount._id, balance: { $gte: transferAmount } },
        { $inc: { balance: -transferAmount } },
        { new: true }
      );

      if (!updatedSender) {
        return res.status(400).json({
          success: false,
          message: 'Insufficient balance or concurrent modification detected.'
        });
      }

      await Account.findOneAndUpdate(
        { _id: recipientAccount._id },
        { $inc: { balance: transferAmount } },
        { new: true }
      );

      const transaction = await Transaction.create({
        fromAccount: senderAccount.accountNumber,
        toAccount: recipientAccount.accountNumber,
        fromUserId: senderAccount.userId,
        toUserId: recipientAccount.userId,
        amount: transferAmount,
        status: 'success',
        description: description || 'Fund Transfer'
      });

      return res.status(200).json({
        success: true,
        message: `Successfully transferred ₹${transferAmount.toLocaleString('en-IN')} to account ${toAccount}.`,
        transaction,
        updatedSenderBalance: updatedSender.balance
      });
    }
  } catch (error) {
    if (session) {
      await session.abortTransaction();
      session.endSession();
    }
    next(error);
  }
};

// @desc Get transaction history for current user (across all owned accounts or all involved transactions)
// @route GET /api/transactions
exports.getUserTransactions = async (req, res, next) => {
  try {
    const userAccounts = await Account.find({ userId: req.user.id });
    const accountNumbers = userAccounts.map(acc => acc.accountNumber);

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 15;
    const skip = (page - 1) * limit;

    const query = {
      $or: [
        { fromAccount: { $in: accountNumbers } },
        { toAccount: { $in: accountNumbers } },
        { fromUserId: req.user.id },
        { toUserId: req.user.id }
      ]
    };

    const total = await Transaction.countDocuments(query);
    const transactions = await Transaction.find(query)
      .populate('fromUserId', 'name email')
      .populate('toUserId', 'name email')
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      count: transactions.length,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      },
      transactions
    });
  } catch (error) {
    next(error);
  }
};
