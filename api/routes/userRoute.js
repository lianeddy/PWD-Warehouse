const express = require("express");
const { login } = require("../controllers/userControllers");
const { decryptToken } = require("../middlewares");

const route = express.Router();

route.post("/login", login);

module.exports = route;
