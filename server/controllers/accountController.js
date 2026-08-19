const Account = require('../models/Account');
const Transaction = require('../models/Transaction');

// Helper to generate 10-digit random account number
const generateAccountNumber = () => {
  return 'ACC' + Math.floor(1000000000 + Math.random() * 9000000000);
};

// @desc Create a new bank account for authenticated user
// @route POST /api/accounts
exports.createAccount = async (req, res, next) => {
  try {
    const { accountType, initialBalance } = req.body;
    const balance = typeof initialBalance === 'number' && initialBalance >= 0 ? initialBalance : 1000;

    let accountNumber = generateAccountNumber();
    let existingAcc = await Account.findOne({ accountNumber });
    while (existingAcc) {
      accountNumber = generateAccountNumber();
      existingAcc = await Account.findOne({ accountNumber });
    }

    const account = await Account.create({
      userId: req.user.id,
      accountNumber,
      accountType: accountType || 'savings',
      balance
    });

    res.status(201).json({
      success: true,
      message: 'Bank account created successfully.',
      account
    });
  } catch (error) {
    next(error);
  }
};

// @desc Get all accounts for logged in user
// @route GET /api/accounts
exports.getUserAccounts = async (req, res, next) => {
  try {
    const accounts = await Account.find({ userId: req.user.id }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: accounts.length,
      accounts
    });
  } catch (error) {
    next(error);
  }
};

// @desc Get account balance by account ID or Account Number
// @route GET /api/accounts/:id/balance
exports.getAccountBalance = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Can be search by ObjectId or by accountNumber string
    let account;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      account = await Account.findById(id);
    } else {
      account = await Account.findOne({ accountNumber: id });
    }

    if (!account) {
      return res.status(404).json({
        success: false,
        message: 'Account not found.'
      });
    }

    // Ensure account belongs to logged-in user
    if (account.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized access to account details.'
      });
    }

    res.status(200).json({
      success: true,
      accountNumber: account.accountNumber,
      balance: account.balance,
      accountType: account.accountType
    });
  } catch (error) {
    next(error);
  }
};

// @desc Get transactions for a specific account with pagination
// @route GET /api/accounts/:id/transactions
exports.getAccountTransactions = async (req, res, next) => {
  try {
    const { id } = req.params;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    let account;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      account = await Account.findById(id);
    } else {
      account = await Account.findOne({ accountNumber: id });
    }

    if (!account) {
      return res.status(404).json({
        success: false,
        message: 'Account not found.'
      });
    }

    // Verify ownership
    if (account.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized to view transactions for this account.'
      });
    }

    const accNum = account.accountNumber;

    const query = {
      $or: [
        { fromAccount: accNum },
        { toAccount: accNum }
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
