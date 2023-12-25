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
  .post(isAuth, isAdmin, addProduct);
router
  .route('/:productId')
  .get(getSingleProduct)
  .patch(isAuth, isAdmin, updateProduct)
  .delete(isAuth, isAdmin, deleteProduct);

module.exports = router;
