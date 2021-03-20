const {
	addProduct,
	getProducts,
	getCategories,
	getProductById,
} = require("../controllers/productControllers");

const router = require("express").Router();

router.post("/", addProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.get("/categories", getCategories);

module.exports = router;
