const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const inventory = sequelize.define(
	"inventory",
	{
		inventory: DataTypes.STRING,
		warehouse_id: DataTypes.SMALLINT,
		product_id: DataTypes.INTEGER,
		updated_at: DataTypes.DATE,
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

module.exports = inventory;
