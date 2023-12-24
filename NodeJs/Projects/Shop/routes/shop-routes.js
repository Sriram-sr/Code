const express = require('express');
const isAuth = require('../middlewares/is-auth');
const imageParser = require('../utils/image-parser');
const {
  getAllProducts,
  getAdminProducts,
  getSingleProduct,
  addProduct,
  getCartProducts,
  addToCart,
  deleteFromCart,
  getOrders,
  placeOrder
} = require('../controllers/shop-controllers');

const router = express.Router();

router
  .route('/product')
  .get(getAllProducts)
  .post(isAuth, imageParser.single('image'), addProduct);
router.route('/admin-products').get(isAuth, getAdminProducts);
router.route('/product/:productId').get(getSingleProduct);
router
  .route('/cart/:productId')
  .post(isAuth, addToCart)
  .delete(isAuth, deleteFromCart);
router.route('/cart').get(isAuth, getCartProducts);
router.route('/order').get(isAuth, getOrders).post(isAuth, placeOrder);

module.exports = router;
