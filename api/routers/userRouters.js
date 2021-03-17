const express = require('express');
const { register, getSecurityQuestion, registeredChecker, securityQuestionChecker, changePasswordEmailRequest, changePassword } = require('../controllers/userControllers');
const { registerValidator, decryptToken } = require('../middlewares');

const router = express.Router();

router.get('/get-security-question', getSecurityQuestion);
router.post('/register', registerValidator, register);

router.post("/registered-checker", registeredChecker)
router.post("/security-question-checker", securityQuestionChecker)
router.post("/change-password-email-request", changePasswordEmailRequest)
router.patch("/change-password-with-email", decryptToken, changePassword)
router.patch("/change-password-without-email", changePassword)

module.exports = router;
