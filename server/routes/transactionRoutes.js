const express = require('express');
const router = express.Router();
const { transferMoney, getUserTransactions } = require('../controllers/transactionController');
const auth = require('../middleware/auth');

router.use(auth);

router.post('/transfer', transferMoney);
router.get('/', getUserTransactions);

module.exports = router;
