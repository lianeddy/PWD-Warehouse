const express = require("express");
const {
  register,
  getSecurityQuestion,
  login,
  keepLogin,
} = require("../controllers/userControllers");
const { registerValidator, decryptToken } = require("../middlewares");

const router = express.Router();

router.get("/get-security-question", getSecurityQuestion);
router.post("/register", registerValidator, register);
router.post("/login", login);
router.post("/keepLogin", decryptToken, keepLogin);

module.exports = router;
