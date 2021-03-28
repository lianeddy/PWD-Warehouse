const express = require("express");
const router = express.Router();
const {
	getWarehouse,
	getProductsByWarehouse,
	stockMonitoring,
	sentPackage,
} = require("../controllers/adminControllers");
const { getDashboard } = require("../controllers/adminControllers");

router.get("/", getWarehouse);
router.get("/getByWarehouse", getProductsByWarehouse);
router.get("/dashboard", getDashboard);
router.get("/monitoring", stockMonitoring);
router.get("/sent-package", sentPackage);

module.exports = router;
