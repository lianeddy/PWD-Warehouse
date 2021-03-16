const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const product = sequelize.define(
  'product',
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

module.exports = product;
