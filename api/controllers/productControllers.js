const { Op } = require("sequelize");
const { product, inventory, category } = require("../models");

const addProduct = async (req, res, next) => {
	try {
		const {
			name,
			price,
			category_id,
			stock,
			warehouse_id,
			description,
		} = req.body;
		const newProduct = await product.create({
			name,
			price,
			category_id,
			description,
		});
		await inventory.create({
			inventory: stock,
			product_id: newProduct.id,
			warehouse_id,
		});
		return res.status(200).send("successfully added product");
	} catch (err) {
		next(err);
	}
};

const getProducts = async (req, res, next) => {
	try {
		let query = {
			raw: true,
			where: {
				is_available: 1,
			},
		};
		if (req.query.category)
			query.where = {
				...query.where,
				category_id: parseInt(req.query.category),
			};
		if (req.query.min)
			query.where = {
				...query.where,
				price: { [Op.gte]: parseInt(req.query.min) },
			};
		if (req.query.max)
			query.where = {
				...query.where,
				price: { [Op.lte]: parseInt(req.query.max) },
			};
		if (req.query.max && req.query.min)
			query.where = {
				...query.where,
				price: {
					[Op.between]: [parseInt(req.query.min), parseInt(req.query.max)],
				},
			};
		if (req.query.sort == 1)
			query = { ...query, order: [["created_at", "DESC"]] };
		if (req.query.sort == 2)
			query = { ...query, order: [["created_at", "ASC"]] };
		if (req.query.sort == 3) query = { ...query, order: [["price", "ASC"]] };
		if (req.query.sort == 4) query = { ...query, order: [["price", "DESC"]] };
		query = {
			...query,
			attributes: [
				"id",
				"name",
				"price",
				"description",
				"category.category",
				"inventory.inventory",
			],
			include: [
				{
					model: category,
					attributes: [],
				},
				{
					model: inventory,
					attributes: [],
				},
			],
		};
		console.log(query);
		const response = await product.findAll(query);
		return res.status(200).send(response);
	} catch (err) {
		next(err);
	}
};

const getCategories = async (req, res, next) => {
	try {
		const categories = await category.findAll();
		const response = [];
		categories.forEach((value) =>
			response.push({ value: value.id, label: value.category })
		);
		return res.status(200).send(response);
	} catch (err) {
		next(err);
	}
};

module.exports = { addProduct, getProducts, getCategories };
