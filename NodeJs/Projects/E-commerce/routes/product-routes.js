const express = require('express');
const {
  getProducts,
  getSingleProduct,
  addProduct,
  updateProduct
} = require('../controllers/product-controller');

const router = express.Router();

router.route('/').get(getProducts).post(addProduct);
router.route('/:productId').get(getSingleProduct).patch(updateProduct);

module.exports = router;
