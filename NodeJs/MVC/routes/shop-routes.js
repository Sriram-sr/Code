const express = require('express');
const shopController = require('../controllers/shop');
const { isAuthenticated } = require('../middlewares/isAuth');

const router = express.Router();

router.get('/', shopController.getIndex);
router.get('/products', shopController.getProducts);
router.get('/product/:productId', shopController.getProductDetails);
router.get('/cart', isAuthenticated, shopController.getCart);
router.get('/orders', isAuthenticated, shopController.getOrder);
router.post('/cart', isAuthenticated, shopController.postToCart);
router.post('/cart-delete-item', isAuthenticated, shopController.deleteCartItem);
router.post('/create-order', isAuthenticated, shopController.postOrder);

module.exports = router;