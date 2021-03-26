const { warehouse, transaction, transactionItem, cart } = require("../models");

const getWarehouse = async (req, res, next) => {
	try {
		const response = await warehouse.findAll();
		return res.status(200).send(response);
	} catch (err) {
		next(err);
	}
};

const postTransaction = async (req, res, next) => {
	try {
		const { cartItems, warehouseId, paymentMethodId, amount } = req.body;
		let weight = 0;
		cartItems.forEach(async (value) => {
			weight += value.weight * value.qty;
		});
		const post = await transaction.create({
			amount,
			weight,
			user_id: req.params.id,
			warehouse_id: warehouseId,
			payment_method_id: paymentMethodId,
		});
		cartItems.forEach(async (value) => {
			await transactionItem.create({
				qty: value.qty,
				product_id: value.product_id,
				transaction_id: post.id,
			});
			await cart.destroy({
				where: {
					id: value.id,
				},
			});
		});
		return res.status(200).send("successfully post transaction");
	} catch (err) {
		next(err);
	}
};

module.exports = { getWarehouse, postTransaction };
