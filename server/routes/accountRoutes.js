const express = require('express');
const router = express.Router();
const {
  createAccount,
  getUserAccounts,
  getAccountBalance,
  getAccountTransactions
} = require('../controllers/accountController');
const auth = require('../middleware/auth');

router.use(auth);

router.post('/', createAccount);
router.get('/', getUserAccounts);
router.get('/:id/balance', getAccountBalance);
router.get('/:id/transactions', getAccountTransactions);

module.exports = router;
