const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const category = require("./category");
const inventory = require("./inventory");

const product = sequelize.define(
	"product",
	{
		name: DataTypes.STRING,
		price: DataTypes.INTEGER,
		created_at: DataTypes.DATE,
		category_id: DataTypes.TINYINT,
		is_available: DataTypes.TINYINT,
		description: DataTypes.STRING,
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

product.belongsTo(category, {
	foreignKey: {
		name: "category_id",
	},
});
product.hasOne(inventory, {
	foreignKey: {
		name: "product_id",
	},
});

//product
//productimage fk product_id
//inventory fk product_id warehouse_id manyToMany
//warehouse

// input: nama, price, description, category_id, stock, warehouse_id, gambar[]

module.exports = product;
