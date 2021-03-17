const express = require('express');
const { register, getSecurityQuestion, registeredChecker, securityQuestionChecker, changePasswordEmailRequest, changePassword } = require('../controllers/userControllers');
const { registerValidator, decryptToken } = require('../middlewares');

const route = express.Router();

route.get('/get-security-question', getSecurityQuestion);
route.post('/register', registerValidator, register);

route.post("/registered-checker", registeredChecker)
route.post("/security-question-checker", securityQuestionChecker)
route.post("/change-password-email-request", changePasswordEmailRequest)
route.patch("/change-password-with-email", decryptToken, changePassword)
route.patch("/change-password-without-email", changePassword)

module.exports = route;
