const express = require("express");
const { login, keepLogin } = require("../controllers/userControllers");
const { decryptToken } = require("../middlewares");

const route = express.Router();

route.post("/login", login);
route.post("/keepLogin", decryptToken, keepLogin);

module.exports = route;
