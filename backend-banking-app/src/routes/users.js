const express = require('express');
const { createAccount, login, getProfile, deposit, withdraw, getBalance } = require('../controllers/userController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/create-account', createAccount);
router.post('/login', login);
router.get('/profile', auth, getProfile);
router.post('/deposit', auth, deposit);
router.post('/withdraw', auth, withdraw);
router.post('/get_balance', auth, getBalance);

module.exports = router;
