const {
	user,
	warehouse,
	transaction,
	transactionItem,
	cart,
	orderStatus,
	product,
	productImage,
	invoice,
	inventory,
} = require("../models");
const pify = require("pify");
const fs = require("fs");
const {
	uploader,
	addDateHandler,
	generatePdfHandler,
	emailHandler,
} = require("../handlers");
const path = require("path");

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
		const {
			cartItems,
			nearestWarehouse,
			paymentMethodId,
			amount,
			shipping,
		} = req.body;
		const current_time = Date.now();
		const stock_gateway = [];
		const getInventory = await inventory.findAll({
			attributes: [
				"id",
				"stock",
				"booked_stock",
				"updated_at",
				"warehouse_id",
				"product_id",
			],
		});
		let num;
		let differ = [];
		let next_differ = [];
		getInventory.forEach((inv, index) => {
			let stock = 0;
			cartItems.forEach(async (cart) => {
				if (
					inv.product_id === cart.product_id &&
					inv.warehouse_id === nearestWarehouse[0].warehouse.id
				) {
					if (inv.stock >= cart.qty) {
						stock = inv.stock - cart.qty;
						differ.push({
							inventoryId: inv.id,
							productId: inv.product_id,
							warehouseId: nearestWarehouse[0].warehouse.id,
							differ: 0,
						});
						stock_gateway.push({
							product_id: inv.product_id,
							stock_gateway: [
								{
									warehouse_id: nearestWarehouse[0].warehouse.id,
									qty: cart.qty,
								},
							],
						});
						await inventory.update(
							{
								stock,
								booked_stock: cart.qty,
							},
							{
								where: { id: inv.id },
							}
						);
					}
					if (inv.stock < cart.qty) {
						stock = 0;
						num = cart.qty - inv.stock;
						differ.push({
							inventoryId: inv.id,
							productId: inv.product_id,
							warehouseId: nearestWarehouse[0].warehouse.id,
							differ: num,
						});
						stock_gateway.push({
							product_id: inv.product_id,
							stock_gateway: [
								{
									warehouse_id: nearestWarehouse[0].warehouse.id,
									qty: inv.stock,
								},
							],
						});
						await inventory.update(
							{
								stock,
								booked_stock: inv.stock,
							},
							{
								where: { id: inv.id },
							}
						);
					}
				}
			});
			if (differ.length !== 0) {
				cartItems.forEach(async (cart, index) => {
					if (
						inv.product_id === cart.product_id &&
						inv.warehouse_id === nearestWarehouse[1].warehouse.id
					) {
						if (inv.stock >= differ[index].differ) {
							stock = inv.stock - differ[index].differ;
							next_differ.push({
								inventoryId: inv.id,
								warehouseId: nearestWarehouse[1].warehouse.id,
								productId: inv.product_id,
								nextDiffer: 0,
							});
							stock_gateway[index].stock_gateway.push({
								warehouse_id: nearestWarehouse[1].warehouse.id,
								qty: differ[index].differ,
							});
							await inventory.update(
								{
									stock,
									booked_stock: differ[index].differ,
								},
								{
									where: { id: inv.id },
								}
							);
						}
						if (inv.stock < differ[index].differ) {
							stock = 0;
							num = differ[index].differ - inv.stock;
							next_differ.push({
								inventoryId: inv.id,
								warehouseId: nearestWarehouse[1].warehouse.id,
								productId: inv.product_id,
								nextDiffer: num,
							});
							stock_gateway[index].stock_gateway.push({
								warehouse_id: nearestWarehouse[1].warehouse.id,
								qty: inv.stock,
							});
							await inventory.update(
								{
									stock,
									booked_stock: inv.stock,
								},
								{
									where: { id: inv.id },
								}
							);
						}
					}
				});
			}
			if (next_differ.length !== 0) {
				cartItems.forEach(async (cart, index) => {
					if (
						inv.product_id === cart.product_id &&
						inv.warehouse_id === nearestWarehouse[2].warehouse.id
					) {
						if (inv.stock >= next_differ[index].differ) {
							stock = inv.stock - next_differ[index].differ;
							next_differ.push({
								inventoryId: inv.id,
								warehouseId: nearestWarehouse[1].warehouse.id,
								productId: inv.product_id,
								nextDiffer: 0,
							});
							stock_gateway[index].stock_gateway.push({
								warehouse_id: nearestWarehouse[1].warehouse.id,
								qty: differ[index].differ,
							});
							await inventory.update(
								{
									stock,
									booked_stock: differ[index].differ,
								},
								{
									where: { id: inv.id },
								}
							);
						}
					}
				});
			}
		});
		let weight = 0;
		cartItems.forEach(async (value) => {
			weight += value.weight * value.qty;
		});
		const post = await transaction.create({
			amount,
			weight,
			user_id: req.params.id,
			warehouse_id: nearestWarehouse[0].warehouse.id,
			payment_method_id: paymentMethodId,
			warehouse_log: JSON.stringify(nearestWarehouse),
			stock_gateway: JSON.stringify(stock_gateway),
		});
		const postInvoice = await invoice.create({
			invoice: `ING${current_time}`,
			note: "",
			shipping: JSON.stringify(shipping),
			transaction_id: post.id,
			due_on: addDateHandler(2),
			invoicepath: `/invoices/${current_time}.pdf`,
		});
		const getUser = await user.findByPk(req.params.id);
		const data = {
			title: "A new Brazilian School",
			date: "05/12/2018",
			name: "Rodolfo Luis Marcos",
			age: 28,
			birthdate: "12/07/1990",
			course: "Computer Science",
			obs:
				"Graduated in 2014 by Federal University of Lavras, work with Full-Stack development and E-commerce.",
		};
		// console.log(postInvoice.invoice);
		generatePdfHandler("Invoice", data, postInvoice.invoice);

		const mailOption = {
			from: "Admin <nature.goods.official@no-reply.com>",
			to: getUser.email,
			subject: "Invoice",
			// template: "Invoice",
			html: `
        <div>
          <p>Thank you</p>
        </div>`,
			attachments: [
				{
					filename: `${postInvoice.invoice}.pdf`,
					path: path.resolve("public/invoices/", `${postInvoice.invoice}.pdf`),
					// path: `../public/invoices/${postInvoice.invoice}.pdf`,
				},
			],
		};
		await emailHandler(mailOption);
		getInventory.forEach((inv) => {
			cartItems.forEach(async (cartItem) => {
				await transactionItem.create({
					qty: cartItem.qty,
					product_id: cartItem.product_id,
					transaction_id: post.id,
				});
				await cart.destroy({
					where: {
						id: cartItem.id,
					},
				});
			});
		});
		console.log("success");
		return res.status(200).send(stock_gateway);
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
				warehouse_log: JSON.parse(val.warehouse_log),
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
				order_status_id: 2,
				bill_imagepath: `${path}/${req.files.image[0].filename}`,
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

const viewInvoice = async (req, res, next) => {
	try {
		const data = {
			title: "NATURE GOODS",
			date: "05/12/2018",
			name: "Rodolfo Luis Marcos",
			age: 28,
			birthdate: "12/07/1990",
			course: "Computer Science",
			obs:
				"Graduated in 2014 by Federal University of Lavras, work with Full-Stack development and E-commerce.",
		};
		// console.log(postInvoice.invoice);
		generatePdfHandler("Invoice", data, "123123dfmk");
		return res.status(200).send("e");
	} catch (err) {
		next(err);
	}
};

module.exports = {
	getWarehouse,
	postTransaction,
	getTransaction,
	postPaymentBill,
	viewInvoice,
};
