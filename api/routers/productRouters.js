const { addProduct, getProducts, getCategories } = require('../controllers/productControllers');

const router = require('express').Router();

router.post('/', addProduct);
router.get('/', getProducts);
router.get('/categories', getCategories);

module.exports = router;
