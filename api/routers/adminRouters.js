const express = require("express");
const router = express.Router();
const {
  getWarehouse,
  getProductsByWarehouse,
} = require("../controllers/adminControllers");
const { getDashboard } = require("../controllers/adminControllers");

router.get("/", getWarehouse);
router.get("/getByWarehouse", getProductsByWarehouse);
router.get("/dashboard", getDashboard);

module.exports = router;
