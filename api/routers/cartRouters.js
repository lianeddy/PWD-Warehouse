const express = require("express");
const {
	getCartByUserId,
	updateCartQty,
} = require("../controllers/cartControllers");

const router = express.Router();

router.get("/get/:user_id", getCartByUserId);
router.patch("/update-qty/:id", updateCartQty);

module.exports = router;
