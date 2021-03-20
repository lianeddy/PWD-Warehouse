const { product, warehouse, inventory } = require("../models");

const getWarehouse = async (req, res, next) => {
	try {
		const getWarehouse = await warehouse.findAll();
		const response = [];
		getWarehouse.forEach((value) => {
			response.push({ value: value.id, label: value.warehouse });
		});
		return res.status(200).send(response);
	} catch (err) {
		next(err);
	}
};

const getProductsByWarehouse = async (req, res, next) => {
	try {
		const getProducts = await warehouse.findAll({
			raw: true,
			attributes: ["warehouse", "products.name", "products.inventory.stock"],
			include: [
				{
					model: product,
					attributes: [],
					through: {
						model: inventory,
						attributes: [],
					},
				},
			],
		});
		return res.status(200).send(getProducts);
	} catch (err) {
		next(err);
	}
};

// const addProduct;

module.exports = {
	getWarehouse,
	getProductsByWarehouse,
};
