const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const userAddress = sequelize.define(
	"user_address",
	{
		label: DataTypes.STRING,
		provinsi: DataTypes.STRING,
		kota: DataTypes.STRING,
		kecamatan: DataTypes.STRING,
		kelurahan: DataTypes.STRING,
		kode_pos: DataTypes.STRING,
		alamat_lengkap: DataTypes.STRING,
		user_id: DataTypes.INTEGER,
		latitude: DataTypes.FLOAT,
		longitude: DataTypes.FLOAT,
		phone: DataTypes.INTEGER,
	},
	{
		timestamps: false,
		freezeTableName: true,
	}
);

module.exports = userAddress;
