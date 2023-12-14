const Product = require('../models/Product');
const { errorHandler } = require('../utils/error-handler');

// @route   GET api/v1/product/
// @desc    Gets all products
// @access  Public
const getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      res.status(200).json({
        message: 'Sucessfully fetched products',
        totalProducts: products.length,
        products
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not get products currently',
        500,
        next,
        err
      )
    );
};

// @route   POST api/v1/product/
// @desc    Created new product
// @access  Public
const addProduct = (req, res, next) => {
  Product.create(req.body)
    .then(product => {
      res.status(201).json({
        message: 'Sucessfully created product',
        product
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not add product currently',
        500,
        next,
        err
      )
    );
};

module.exports = {
  getProducts,
  addProduct
};
