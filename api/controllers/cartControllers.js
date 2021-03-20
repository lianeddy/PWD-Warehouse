const {
	cart,
	user,
	product,
	productImage,
	warehouse,
	inventory,
	category,
} = require("../models");

const getCartById = async (req, res, next) => {
	const { id } = req.params;
	try {
		const getData = await cart.findAll({
			where: {
				user_id: id,
			},
			include: [
				{
					model: product,
					include: [{ model: productImage }, { model: category }],
					required: true,
				},
			],
		});

		const response = getData.map((val, i) => {
			return {
				name: val.product.name,
				price: val.product.price,
				category: val.product.category.category,
				description: val.product.description,
				qty: val.qty,
				imagepath: val.product.product_images[0].imagepath,
			};
		});

		res.status(200).send(response);
	} catch (err) {
		console.log(err);
	}
};

module.exports = {
	getCartById,
};
