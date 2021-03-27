const {
	warehouse,
	transaction,
	transactionItem,
	cart,
	orderStatus,
	product,
	productImage,
} = require("../models");
const pify = require("pify");
const fs = require("fs");
const { uploader } = require("../handlers");

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

const getTransaction = async (req, res, next) => {
	const { user_id } = req.params;
	try {
		const getData = await transaction.findAll({
			where: {
				user_id,
			},
			include: [
				{ model: orderStatus },
				{ model: product, include: [{ model: productImage }] },
			],
		});
		const response = getData.map((val) => {
			return {
				transactionId: val.id,
				amount: val.amount,
				date: val.created_at,
				orderStatus: val.order_status.order_status,
				addressiD: val.address_id,
				products: val.products.map((val) => {
					return {
						productId: val.id,
						name: val.name,
						price: val.price,
						qty: val.transaction_item.qty,
						imagepath: val.product_images[0].imagepath,
					};
				}),
			};
		});
		res.status(200).send(response);
	} catch (err) {
		next(err);
	}
};

const postPaymentBill = async (req, res, next) => {
	try {
		console.log(req);
		const path = "/payment_bills";
		const upload = pify(uploader(path, "BIL").fields([{ name: "image" }]));
		await upload(req, res);
		const old = await transaction.findOne({
			where: {
				id: req.params.transaction_id,
			},
		});
		const oldImagepath = old.dataValues.bill_imagepath;
		await transaction.update(
			{
				order_status_id: 1,
				bill_imagepath: req.files.image[0].filename,
			},
			{
				where: {
					id: req.params.transaction_id,
				},
			}
		);
		if (fs.existsSync(`./public${path}/${oldImagepath}`)) {
			fs.unlinkSync(`public${path}/${oldImagepath}`);
		}
		return res.status(200).send(req.files);
	} catch (err) {
		next(err);
	}
};

module.exports = {
	getWarehouse,
	postTransaction,
	getTransaction,
	postPaymentBill,
};
