const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const paymentStatus = sequelize.define(
	"payment_status",
	{
		payment_status: DataTypes.STRING,
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

module.exports = paymentStatus;
