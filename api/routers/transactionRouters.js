const {
	getWarehouse,
	postTransaction,
} = require("../controllers/transactionControllers");

const router = require("express").Router();

router.get("/warehouse", getWarehouse);
router.post("/:id", postTransaction);

module.exports = router;
