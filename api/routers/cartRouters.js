const express = require("express");
const { getCartById } = require("../controllers/cartControllers");

const router = express.Router();

router.get("/get/:id", getCartById);

module.exports = router;
