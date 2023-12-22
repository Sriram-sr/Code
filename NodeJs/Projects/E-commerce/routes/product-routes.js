const express = require('express');
const { isAuth, isAdmin } = require('../middlewares/is-auth');
const {
  getProductsValidationRules
} = require('../validation/product-validators');
const {
  getProducts,
  getSingleProduct,
  addProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/product-controller');

const router = express.Router();

router
  .route('/')
  .get(getProductsValidationRules, getProducts)
  .post(isAuth, isAuth, isAdmin, addProduct);
router
  .route('/:productId')
  .get(getSingleProduct)
  .patch(isAuth, isAuth, isAdmin, updateProduct)
  .delete(isAuth, isAuth, isAdmin, deleteProduct);

module.exports = router;
