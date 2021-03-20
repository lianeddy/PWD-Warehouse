const { cart } = require("../models");

const addToCart = async (req, res, next) => {
	try {
		console.log(req.body);
		console.log(req.params);
		const addCart = await cart.create({
			qty: req.body.qty,
			product_id: req.params.id,
			user_id: req.body.user_id,
		});
		res.status(200).send({ message: "Add to Cart Success", id: addCart.id });
	} catch (err) {
		next(err);
	}
};

const editQtyCart = async (req, res, next) => {
	try {
		const qty = await cart.update(
			{
				qty: req.body.qty,
				// product_id: req.body.product_id,
			},
			{
				where: {
					user_id: req.params.id,
				},
			}
		);
		res.status(200).send({ message: "Updated", id: qty.id });
	} catch (err) {
		next(err);
	}
};

module.exports = { addToCart, editQtyCart };
