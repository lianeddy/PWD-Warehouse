const express = require("express");
const {
  getCartById,
  addToCart,
  editQtyCart,
} = require("../controllers/cartControllers");

const router = express.Router();

router.get("/get/:id", getCartById);
router.post("/add-to-cart/:id", addToCart);
router.put("/edit-qty/:id", editQtyCart);

module.exports = router;
