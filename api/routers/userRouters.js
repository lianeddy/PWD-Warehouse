const express = require("express");
const { login, keepLogin } = require("../controllers/userControllers");
const { decryptToken } = require("../middlewares");

const router = express.Router();

router.post("/login", login);
router.post("/keepLogin", decryptToken, keepLogin);

module.exports = router;
