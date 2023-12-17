const Product = require('../models/Product');
const { errorHandler } = require('../utils/error-handler');

// @route   GET api/v1/product/
// @desc    Gets all products
// @access  Public
const getProducts = (req, res, next) => {
  const { name, price, category, page } = req.query;

  // Filtering
  let findFilter = {};
  if (name) {
    findFilter = { productName: { $regex: name, $options: 'i' } };
  }
  if (price) {
    findFilter = {
      ...findFilter,
      price: { $gte: price.gte, $lte: price.lte }
    };
  }
  if (category) {
    findFilter = {
      ...findFilter,
      category: category
    };
  }

  // Pagination
  const currentPage = page || 1;
  const perPage = 2;

  Product.find(findFilter)
    .skip((currentPage - 1) * perPage)
    .limit(perPage)
    .then(products => {
      res.status(200).json({
        message: 'Sucessfully fetched the products',
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

// @route   GET api/v1/product/:productId
// @desc    Gets single product
// @access  Public
const getSingleProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId)
    .then(product => {
      if (!product) {
        return errorHandler(
          'No product found with provided product id',
          404,
          next
        );
      }
      res.status(200).json({
        message: 'Successfully fetched the product',
        product
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not get product currently',
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
        message: 'Sucessfully created the product',
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

// @route   PATCH api/v1/product/
// @desc    Updates the product
// @access  Public
const updateProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findByIdAndUpdate(productId, req.body, {
    new: true
  })
    .then(updatedProduct => {
      if (!updatedProduct) {
        return errorHandler(
          'No product found with provided product id',
          404,
          next
        );
      }
      res.status(200).json({
        message: 'Successfully updated product',
        updatedProduct
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not update product currently',
        500,
        next,
        err
      )
    );
};

// @route   DELETE api/v1/product/
// @desc    Deletes the product
// @access  Public
const deleteProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId)
    .then(product => {
      if (!product) {
        return errorHandler(
          'No product found with provided product id',
          404,
          next
        );
      }
      product
        .deleteOne()
        .then(() => {
          res.status(200).json({
            message: 'Successfully deleted product'
          });
        })
        .catch(err =>
          errorHandler(
            'Something went wrong, could not get product currently',
            500,
            next,
            err
          )
        );
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not get product currently',
        500,
        next,
        err
      )
    );
};

module.exports = {
  getProducts,
  getSingleProduct,
  addProduct,
  updateProduct,
  deleteProduct
};
