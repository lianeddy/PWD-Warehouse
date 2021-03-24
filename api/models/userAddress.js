const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const userAddress = sequelize.define(
	"user_address",
	{
		is_main: DataTypes.INTEGER,
		user_id: DataTypes.INTEGER,
		label: DataTypes.STRING,
		alamat_detail: DataTypes.STRING,
		provinsi: DataTypes.STRING,
		kota: DataTypes.STRING,
		kecamatan: DataTypes.STRING,
		kelurahan: DataTypes.STRING,
		kode_pos: DataTypes.STRING,
		longitude: DataTypes.DECIMAL,
		latitude: DataTypes.DECIMAL,
		phone: DataTypes.STRING,
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

module.exports = userAddress;
