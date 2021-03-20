const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const user = require("./user");
const paymentStatus = require("./paymentStatus");
const orderStatus = require("./orderStatus");

const transaction = sequelize.define(
	"transaction",
	{
		amout: DataTypes.INTEGER,
		created_at: DataTypes.DATE,
		user_id: DataTypes.INTEGER,
		payment_status_id: DataTypes.TINYINT,
		order_status_id: DataTypes.TINYINT,
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

transaction.belongsTo(user, {
	foreignKey: "user_id",
});
user.hasMany(transaction, {
	foreignKey: "user_id",
});

transaction.belongsTo(paymentStatus, {
	foreignKey: "payment_status_id",
});
paymentStatus.hasOne(transaction, {
	foreignKey: "payment_status_id",
});

transaction.belongsTo(orderStatus, {
	foreignKey: "order_status_id",
});
orderStatus.hasOne(transaction, {
	foreignKey: "order_status_id",
});

module.exports = transaction;
