const express = require('express');
const {
  getProducts,
  addProduct
} = require('../controllers/product-controller');

const router = express.Router();

router.route('/').get(getProducts).post(addProduct);

module.exports = router;
