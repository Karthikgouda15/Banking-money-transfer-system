const User = require('../models/User');
const Account = require('../models/Account');
const jwt = require('jsonwebtoken');

// Helper to generate 10-digit random account number
const generateAccountNumber = () => {
  return 'ACC' + Math.floor(1000000000 + Math.random() * 9000000000);
};

// Generate JWT token
const generateToken = (userId, email) => {
  return jwt.sign(
    { id: userId, email },
    process.env.JWT_SECRET || 'fallback_secret_key',
    { expiresIn: '7d' }
  );
};

// @desc Register user & create initial bank account
// @route POST /api/auth/register
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, initialBalance } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password.'
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email already exists.'
      });
    }

    // Create user
    const user = await User.create({ name, email, password });

    // Create primary bank account for user with initial balance (default ₹5,000 if not specified)
    const startingBalance = typeof initialBalance === 'number' && initialBalance >= 0 ? initialBalance : 5000;
    
    let accountNumber = generateAccountNumber();
    // Ensure uniqueness
    let existingAcc = await Account.findOne({ accountNumber });
    while (existingAcc) {
      accountNumber = generateAccountNumber();
      existingAcc = await Account.findOne({ accountNumber });
    }

    const account = await Account.create({
      userId: user._id,
      accountNumber,
      accountType: 'savings',
      balance: startingBalance
    });

    const token = generateToken(user._id, user.email);

    res.status(201).json({
      success: true,
      message: 'User registered successfully with primary bank account.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      account
    });
  } catch (error) {
    next(error);
  }
};

// @desc Login user
// @route POST /api/auth/login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password.'
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const token = generateToken(user._id, user.email);
    const accounts = await Account.find({ userId: user._id });

    res.status(200).json({
      success: true,
      message: 'Login successful.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      accounts
    });
  } catch (error) {
    next(error);
  }
};

// @desc Get current authenticated user details
// @route GET /api/auth/me
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

    const accounts = await Account.find({ userId: user._id });

    res.status(200).json({
      success: true,
      user,
      accounts
    });
  } catch (error) {
    next(error);
  }
};
