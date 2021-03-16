const { addProduct, getProducts, getCategories } = require('../controllers/productControllers');

const route = require('express').Router();

route.post('/', addProduct);
route.get('/', getProducts);
route.get('/categories', getCategories);

module.exports = route;
