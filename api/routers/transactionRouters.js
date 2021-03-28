const {
	getWarehouse,
	postTransaction,
	getTransaction,
	postPaymentBill,
	viewInvoice,
} = require("../controllers/transactionControllers");

const router = require("express").Router();

router.get("/abc", viewInvoice);
router.get("/warehouse", getWarehouse);
router.get("/:user_id", getTransaction);
router.post("/bill-of-payment/:transaction_id", postPaymentBill);
router.post("/:id", postTransaction);

module.exports = router;
