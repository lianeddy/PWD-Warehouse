const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const transactionItem = sequelize.define(
	"transaction_item",
	{
		qty: DataTypes.INTEGER,
		imagepath: DataTypes.STRING,
		transaction_id: DataTypes.INTEGER,
		product_id: DataTypes.INTEGER,
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

module.exports = transactionItem;
