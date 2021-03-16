const { addProduct, getProducts } = require('../controllers/productControllers');

const route = require('express').Router();

route.post('/', addProduct);
route.get('/', getProducts);

module.exports = route;
