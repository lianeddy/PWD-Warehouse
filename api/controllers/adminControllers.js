const { response } = require("express");
const { Op } = require("sequelize");
const sequelize = require("../database");
const {
	transaction,
	user,
	monthly_report,
	product,
	warehouse,
	inventory,
	category,
	userAddress,
} = require("../models");

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

const getDashboard = async (req, res, next) => {
	try {
		const totalOrder = await transaction.count("id", {
			where: { order_status_id: 5 },
		});

		const totalProfit = await transaction.sum("amount", {
			where: { order_status_id: 5 },
		});

		const totalClient = await user.count();

		const dailyProfit = await transaction.sum("amount", {
			where: {
				created_at: {
					[Op.between]: [
						sequelize.fn("subdate", sequelize.fn("now"), 1),
						sequelize.fn("now"),
					],
				},
				order_status_id: 5,
			},
		});

		const weeklyProfit = await transaction.sum("amount", {
			where: {
				created_at: {
					[Op.between]: [
						sequelize.fn("subdate", sequelize.fn("now"), 7),
						sequelize.fn("now"),
					],
				},
				order_status_id: 5,
			},
		});

		const monthlyProfit = await transaction.sum("amount", {
			where: {
				created_at: {
					[Op.between]: [
						sequelize.fn(
							"subdate",
							sequelize.fn("now"),
							sequelize.fn("dayofmonth", sequelize.fn("now"))
						),
						sequelize.fn("now"),
					],
				},
				order_status_id: 5,
			},
		});

		const [[rangeMonthly]] = await sequelize.query(`
			SELECT
				DAYNAME(SUBDATE(NOW(), DAYOFMONTH(NOW()))) AS from_dayname,
    		DAYOFMONTH(SUBDATE(NOW(), DAYOFMONTH(now())-1)) AS from_date,
    		EXTRACT(MONTH FROM SUBDATE(NOW(), DAYOFMONTH(NOW())-1)) AS from_month,
				MONTHNAME(SUBDATE(NOW(), DAYOFMONTH(NOW())-1)) AS from_monthname,
    		YEAR(SUBDATE(NOW(), DAYOFMONTH(NOW()))) AS from_year,
    		DATE_FORMAT(SUBDATE(NOW(), DAYOFMONTH(NOW()) -1), '%M, %D %Y') AS from_date_format,
    		SUBDATE(NOW(), DAYOFMONTH(NOW())-1) AS from_spesific_date,
    		DAYNAME(NOW()) AS to_dayname,
				DAYOFMONTH(NOW()) AS to_date,
				EXTRACT(MONTH FROM NOW()) AS to_month,
    		MONTHNAME(NOW()) AS to_monthname,
    		YEAR(NOW()) AS to_year,
				DATE_FORMAT(NOW(), '%M, %D %Y') AS to_date_format,
    		NOW() AS to_spesific_date 
			FROM transaction WHERE id=1;
		`);

		const [[rangeWeekly]] = await sequelize.query(`
			SELECT
				DAYNAME(SUBDATE(NOW(), 7)) AS from_dayname,
    		DAYOFMONTH(SUBDATE(NOW(), 7)) AS from_date,
       	MONTHNAME(SUBDATE(NOW(), 1)) AS from_monthname,
    		EXTRACT(MONTH FROM SUBDATE(created_at, 7)) AS from_month,
        YEAR(SUBDATE(NOW(), DAYOFMONTH(NOW()))) AS from_year,
    		DATE_FORMAT(SUBDATE(NOW(), 7), '%M, %D %Y') AS from_date_format,
    		SUBDATE(NOW(), 7) AS from_spesific_date,
    		DAYNAME(NOW()) AS to_dayname,
				DAYOFMONTH(NOW()) AS to_date,
				EXTRACT(MONTH FROM NOW()) AS to_month,
				MONTHNAME(NOW()) AS to_monthname,
				YEAR(NOW()) AS to_year,
				DATE_FORMAT(NOW(), '%M, %D %Y') AS to_date_format,
    		NOW() AS to_spesific_date 
			FROM transaction WHERE id=1;
		`);

		const [[rangeDaily]] = await sequelize.query(`
			SELECT
				DAYNAME(SUBDATE(NOW(), 1)) AS from_dayname,
    		DAYOFMONTH(SUBDATE(NOW(), 1)) AS from_date,
    		EXTRACT(MONTH FROM SUBDATE(created_at, 1)) AS from_month,
				MONTHNAME(SUBDATE(NOW(), 1)) AS from_monthname,
				YEAR(SUBDATE(NOW(), DAYOFMONTH(NOW()))) AS from_year,
    		DATE_FORMAT(SUBDATE(NOW(), 1), '%M, %D %Y') AS from_date_format,
    		SUBDATE(NOW(), 1) AS from_spesific_date,
    		DAYNAME(NOW()) AS to_dayname,
				DAYOFMONTH(NOW()) AS to_date,
				MONTHNAME(NOW()) AS to_monthname,
				EXTRACT(MONTH FROM NOW()) AS to_month,
				YEAR(NOW()) AS to_year,
				DATE_FORMAT(NOW(), '%M, %D %Y') AS to_date_format,
   		 	NOW() AS to_spesific_date 
			FROM transaction WHERE id=1;
		`);

		const monthlyTransaction = await transaction.findAll({
			where: {
				created_at: {
					[Op.between]: [
						sequelize.fn(
							"subdate",
							sequelize.fn("now"),
							sequelize.fn("dayofmonth", sequelize.fn("now"))
						),
						sequelize.fn("now"),
					],
				},
				order_status_id: 5,
			},
		});

		const weeklyTransaction = await transaction.findAll({
			where: {
				created_at: {
					[Op.between]: [
						sequelize.fn("subdate", sequelize.fn("now"), 7),
						sequelize.fn("now"),
					],
				},
				order_status_id: 5,
			},
		});

		const dailyTransaction = await transaction.findAll({
			where: {
				created_at: {
					[Op.between]: [
						sequelize.fn("subdate", sequelize.fn("now"), 1),
						sequelize.fn("now"),
					],
				},
				order_status_id: 5,
			},
		});

		const monthlyReport = {
			range: rangeMonthly ? rangeMonthly : null,
			profit: parseInt(monthlyProfit),
			transaction: monthlyTransaction,
		};
		const weeklyReport = {
			range: rangeWeekly ? rangeWeekly : null,
			profit: parseInt(weeklyProfit),
			transaction: weeklyTransaction,
		};
		const dailyReport = {
			range: rangeDaily ? rangeDaily : null,
			profit: parseInt(dailyProfit),
			transaction: dailyTransaction,
		};

		const getMonthlyReportGroup = await monthly_report.findAll({
			group: "year",
		});

		const getMonthlyReport = await monthly_report.findAll();

		const anualReport = [];

		getMonthlyReportGroup.forEach((group, index) => {
			return anualReport.push({
				id: group.year,
				data: getMonthlyReport.map((month, index) => {
					return {
						x: month.month,
						y: month.total_order,
						profit: month.profit,
					};
				}),
			});
		});

		const response = {
			totalOrder,
			totalProfit,
			totalClient,
			monthlyReport,
			weeklyReport,
			dailyReport,
			anualReport,
		};

		return res.status(200).send(response);
	} catch (err) {
		next(err);
	}
};

const stockMonitoring = async (req, res, next) => {
	try {
		const getProducts = await product.findAll({
			include: [{ model: inventory }, { model: category }],
		});
		let getIndex;
		getProducts.forEach((value) => {
			value.inventories.forEach((item) => {
				if (item.stock === 0) {
					getIndex = value.id;
				}
			});
		});
		await product.update(
			{ is_available_all: 0 },
			{
				where: {
					id: getIndex,
				},
			}
		);
		const response = await product.findAll({
			include: [{ model: inventory }, { model: category }],
			order: [
				[{ model: inventory }, "warehouse_id", "ASC"],
				["is_available_all", "ASC"],
			],
		});
		return res.status(200).send(response);
	} catch (err) {
		next(err);
	}
};

const sentPackage = async (req, res, next) => {
	try {
		return res.status(200).send(response);
	} catch (err) {
		next(err);
	}
};

module.exports = {
	getWarehouse,
	getProductsByWarehouse,
	getDashboard,
	stockMonitoring,
	sentPackage,
};
