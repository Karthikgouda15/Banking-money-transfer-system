const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('../models/User');
const Account = require('../models/Account');
const Transaction = require('../models/Transaction');

dotenv.config({ path: path.join(__dirname, '../.env') });

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/bank_transfer_db';
    console.log(`Connecting to MongoDB at: ${mongoUri}`);
    await mongoose.connect(mongoUri);

    console.log('Clearing existing database collections...');
    await User.deleteMany({});
    await Account.deleteMany({});
    await Transaction.deleteMany({});

    console.log('Seeding demo users...');
    const userAlice = await User.create({
      name: 'Alice Smith',
      email: 'alice@bank.com',
      password: 'Password123!'
    });

    const userBob = await User.create({
      name: 'Bob Johnson',
      email: 'bob@bank.com',
      password: 'Password123!'
    });

    const userCharlie = await User.create({
      name: 'Charlie Brown',
      email: 'charlie@bank.com',
      password: 'Password123!'
    });

    console.log('Seeding bank accounts...');
    const accountAlice1 = await Account.create({
      userId: userAlice._id,
      accountNumber: 'ACC1000000001',
      accountType: 'savings',
      balance: 15000
    });

    const accountAlice2 = await Account.create({
      userId: userAlice._id,
      accountNumber: 'ACC1000000002',
      accountType: 'checking',
      balance: 5000
    });

    const accountBob = await Account.create({
      userId: userBob._id,
      accountNumber: 'ACC2000000002',
      accountType: 'savings',
      balance: 8500
    });

    const accountCharlie = await Account.create({
      userId: userCharlie._id,
      accountNumber: 'ACC3000000003',
      accountType: 'savings',
      balance: 2000
    });

    console.log('Seeding sample transactions...');
    await Transaction.create([
      {
        fromAccount: accountAlice1.accountNumber,
        toAccount: accountBob.accountNumber,
        fromUserId: userAlice._id,
        toUserId: userBob._id,
        amount: 2500,
        status: 'success',
        description: 'Payment for services'
      },
      {
        fromAccount: accountBob.accountNumber,
        toAccount: accountCharlie.accountNumber,
        fromUserId: userBob._id,
        toUserId: userCharlie._id,
        amount: 1000,
        status: 'success',
        description: 'Dinner split refund'
      }
    ]);

    console.log('\n==================================================');
    console.log('🎉 Database successfully seeded with demo accounts!');
    console.log('==================================================\n');
    console.log('Demo Credentials for Testing:');
    console.log('--------------------------------------------------');
    console.log('User 1: Alice Smith');
    console.log('  Email: alice@bank.com');
    console.log('  Password: Password123!');
    console.log('  Account 1: ACC1000000001 (Savings) - ₹15,000');
    console.log('  Account 2: ACC1000000002 (Checking) - ₹5,000');
    console.log('--------------------------------------------------');
    console.log('User 2: Bob Johnson');
    console.log('  Email: bob@bank.com');
    console.log('  Password: Password123!');
    console.log('  Account: ACC2000000002 (Savings) - ₹8,500');
    console.log('--------------------------------------------------');
    console.log('User 3: Charlie Brown');
    console.log('  Email: charlie@bank.com');
    console.log('  Password: Password123!');
    console.log('  Account: ACC3000000003 (Savings) - ₹2,000');
    console.log('==================================================\n');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
