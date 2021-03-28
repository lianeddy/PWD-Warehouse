const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const invoice = sequelize.define(
	"invoice",
	{
		invoice: DataTypes.STRING,
		note: DataTypes.STRING,
		shipping: DataTypes.STRING,
		transaction_id: DataTypes.INTEGER,
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

module.exports = invoice;
