const express = require('express');
const { register, getSecurityQuestion } = require('../controllers/userControllers');
const { registerValidator } = require('../middlewares');

const router = express.Router();

router.get('/get-security-question', getSecurityQuestion);
router.post('/register', registerValidator, register);

module.exports = router;
