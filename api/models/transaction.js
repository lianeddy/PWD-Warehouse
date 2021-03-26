const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const user = require("./user");
const orderStatus = require("./orderStatus");
const transactionItem = require("./transactionItem");
const product = require("./product");
const warehouse = require("./warehouse");
const paymentMethod = require("./paymentMethod");

const transaction = sequelize.define(
	"transaction",
	{
		amount: DataTypes.INTEGER,
		weight: DataTypes.INTEGER,
		created_at: DataTypes.DATE,
		user_id: DataTypes.INTEGER,
		order_status_id: DataTypes.TINYINT,
		warehouse_id: DataTypes.TINYINT,
		payment_method_id: DataTypes.TINYINT,
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

// transaction.belongsTo(paymentMethod, {
// 	foreignKey: "payment_method_id",
// });
paymentMethod.hasOne(transaction, {
	foreignKey: "payment_method_id",
});

transaction.belongsTo(warehouse, {
	foreignKey: "warehouse_id",
});
// warehouse.hasOne(warehouse, {
// 	foreignKey: "warehouse_id",
// });

transaction.hasMany(transactionItem, {
	foreignKey: "transaction_id",
});
transactionItem.belongsTo(transaction, {
	foreignKey: "transaction_id",
});

transaction.belongsToMany(product, {
	foreignKey: "transaction_id",
	through: transactionItem,
});
product.belongsToMany(transaction, {
	foreignKey: "product_id",
	through: transactionItem,
});

transaction.belongsTo(user, {
	foreignKey: "user_id",
});
user.hasMany(transaction, {
	foreignKey: "user_id",
});

transaction.belongsTo(orderStatus, {
	foreignKey: "order_status_id",
});
orderStatus.hasOne(transaction, {
	foreignKey: "order_status_id",
});

module.exports = transaction;
