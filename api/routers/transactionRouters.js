const { getWarehouse } = require("../controllers/transactionControllers");

const router = require("express").Router();

router.get("/warehouse", getWarehouse);

module.exports = router;
