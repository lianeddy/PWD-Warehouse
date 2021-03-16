const express = require('express');
const { register, getSecurityQuestion } = require('../controllers/userControllers');
const { registerValidator } = require('../middlewares');

const route = express.Router();

route.get('/get-security-question', getSecurityQuestion);
route.post('/register', registerValidator, register);

module.exports = route;
