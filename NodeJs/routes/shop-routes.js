const express = require('express');
const shopControllers = require('../controllers/shop');

const router = express.Router();

router.get('/', shopControllers.getIndex);
router.get('/products', shopControllers.getProducts);
router.get('/products/:productId', shopControllers.getProduct);
router.get('/cart', shopControllers.getCart);
router.post('/cart', shopControllers.postCart);
router.get('/orders', shopControllers.getOrders);
router.get('/checkout', shopControllers.getCart);

module.exports = router;
