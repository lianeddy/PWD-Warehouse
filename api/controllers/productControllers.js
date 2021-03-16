const { Op } = require('sequelize');
const { product, inventory, category } = require('../models');

// without image
const addProduct = async (req, res, next) => {
  try {
    const { name, price, category_id, stock, warehouse_id } = req.body;
    const newProduct = await product.create({
      name,
      price,
      category_id,
    });
    await inventory.create({
      inventory: stock,
      product_id: newProduct.id,
      warehouse_id,
    });
    return res.status(200).send('successfully added product');
  } catch (err) {
    next(err);
  }
};

product.belongsTo(category, {
  foreignKey: {
    name: 'category_id',
  },
});
product.hasOne(inventory, {
  foreignKey: {
    name: 'product_id',
  },
});

// inventory.belongsTo(product, {
//   foreignKey: {
//     name: 'product_id',
//   },
// });

const getProducts = async (req, res, next) => {
  try {
    console.log(req.query);
    let query = {
      raw: true,
      where: {
        is_available: 1,
      },
    };
    if (req.query.min)
      query.where = { ...query.where, price: { [Op.gte]: parseInt(req.query.min) } };
    if (req.query.max)
      query.where = { ...query.where, price: { [Op.gte]: parseInt(req.query.max) } };
    if (req.query.max && req.query.min)
      query.where = {
        ...query.where,
        price: { [Op.between]: [parseInt(req.query.min), parseInt(req.query.max)] },
      };
    query = {
      ...query,
      attributes: [
        'id',
        'name',
        'price',
        'description',
        'category.category',
        'inventory.inventory',
      ],
      include: [
        {
          model: category,
          attributes: [],
        },
        {
          model: inventory,
          attributes: [],
        },
      ],
    };
    const response = await product.findAll(query);
    return res.status(200).send(response);
  } catch (err) {
    next(err);
  }
};

module.exports = { addProduct, getProducts };
