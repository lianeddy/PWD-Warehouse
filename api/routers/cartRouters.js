const express = require("express");
const {
	getCartByUserId,
	updateCartQty,
	deleteCart,
} = require("../controllers/cartControllers");

const router = express.Router();

router.get("/get/:user_id", getCartByUserId);
router.patch("/update-qty/:id", updateCartQty);
router.delete("/delete/:id", deleteCart);

module.exports = router;
