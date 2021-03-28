const express = require("express");
const router = express.Router();
const {
	getWarehouse,
	getProductsByWarehouse,
	addProductByWarehouse,
	editProduct,
	deleteProduct,
	stockMonitoring,
	sentPackage,
} = require("../controllers/adminControllers");
const { getDashboard } = require("../controllers/adminControllers");

router.get("/", getWarehouse);
router.get("/get-by-warehouse/:id", getProductsByWarehouse);
router.post("/add-product/:id", addProductByWarehouse);
router.get("/dashboard", getDashboard);
router.patch("/edit-product/:id", editProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/monitoring", stockMonitoring);
router.get("/sent-package", sentPackage);

module.exports = router;
