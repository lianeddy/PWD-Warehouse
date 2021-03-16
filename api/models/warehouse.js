const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const warehouse = sequelize.define(
  'warehouse',
  {
    warehouse: DataTypes.STRING,
    address: DataTypes.STRING,
    province: DataTypes.STRING,
    city: DataTypes.STRING,
    sub_district: DataTypes.STRING,
    code: DataTypes.STRING,
    phone: DataTypes.STRING,
    longitude: DataTypes.DECIMAL,
    latitude: DataTypes.DECIMAL,
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

module.exports = warehouse;
