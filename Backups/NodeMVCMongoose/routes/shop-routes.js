const express = require('express');
const shopControllers = require('../controllers/shop');
const isAuthenticated = require('../middlewares/is-auth');

const router = express.Router();

router.get('/', shopControllers.getIndex);
router.get('/products', shopControllers.getProducts);
router.get('/products/:productId', shopControllers.getProduct);
router.get('/cart', isAuthenticated, shopControllers.getCart);
router.post('/cart', isAuthenticated, shopControllers.postCart);
router.post('/delete-cart-item', isAuthenticated, shopControllers.deleteCartItem);
router.post('/create-order', isAuthenticated, shopControllers.postOrder);
router.get('/orders', isAuthenticated, shopControllers.getOrders);
router.get('/checkout',isAuthenticated, shopControllers.getCart);

module.exports = router;
