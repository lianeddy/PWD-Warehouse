const { addToCart, editQtyCart } = require("../controllers/cartControllers");

const router = require("express").Router();

router.post("/add-to-cart/:id", addToCart);
router.put("/edit-qty/:id", editQtyCart);

module.exports = router;
