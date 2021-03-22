const express = require("express");
const {
	getWarehouse,
	getProductsByWarehouse,
} = require("../controllers/adminControllers");

const router = express.Router();

router.get("/", getWarehouse);
router.get("/getByWarehouse", getProductsByWarehouse);

module.exports = router;
