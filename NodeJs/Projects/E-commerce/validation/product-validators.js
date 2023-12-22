const { query, body } = require('express-validator');

exports.getProductsValidationRules = [
  query('name').optional().isString().withMessage('Name must be a string'),
  query('price[gte]')
    .optional()
    .isNumeric()
    .withMessage('Price must be a number'),
  query('price[lte]')
    .optional()
    .isNumeric()
    .withMessage('Price must be a number'),
  query('category')
    .optional()
    .isString()
    .withMessage('Category must be a string'),
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer')
];

exports.createProductValidationRules = [
  body('productName')
    .isString()
    .withMessage('Product name should be string')
    .trim()
    .isLength({ max: 100 })
    .withMessage('Product name should not exceed 100 characters'),
  body('price')
    .isNumeric()
    .withMessage('Price should be a number')
    .custom(value => value >= 0)
    .withMessage('Price should be a positive number'),
  body('description')
    .isString()
    .withMessage('Description should be a string')
    .notEmpty()
    .withMessage('Description should not be empty'),
  body('ratings')
    .optional()
    .isNumeric()
    .withMessage('Ratings should be a number'),
  body('images')
    .isArray()
    .withMessage('Images should be an array')
    .notEmpty()
    .withMessage('Images array should not be empty'),
  body('images.*.publicId')
    .isString()
    .withMessage('Public ID should be a string')
    .notEmpty()
    .withMessage('Public ID should not be empty'),
  body('images.*.url')
    .isString()
    .withMessage('Image URL should be a string')
    .notEmpty()
    .withMessage('Image URL should not be empty'),
  body('category')
    .isString()
    .withMessage('Category should be a string')
    .isIn([
      'Electronics',
      'Cameras',
      'Computers',
      'Mobiles/Tablets',
      'Laptop',
      'Furnitures',
      'Accessories',
      'Headphones',
      'Food',
      'Books',
      'Clothes/Shoes',
      'Beauty/Health',
      'Sports',
      'Outdoor',
      'Home'
    ])
    .withMessage('Please select a valid category'),
  body('seller')
    .isString()
    .withMessage('Seller should be a string')
    .notEmpty()
    .withMessage('Seller should not be empty'),
  body('stock')
    .isNumeric()
    .withMessage('Stock should be a number')
    .custom(value => value >= 0)
    .withMessage('Stock should be a positive number'),
  body('numOfReviews')
    .optional()
    .isNumeric()
    .withMessage('Number of reviews should be a number'),
  body('reviews')
    .isArray()
    .withMessage('Reviews should be an array')
    .notEmpty()
    .withMessage('Reviews array should not be empty'),
  body('reviews.*.name')
    .isString()
    .withMessage('Reviewer name should be a string')
    .notEmpty()
    .withMessage('Reviewer name should not be empty'),
  body('reviews.*.rating')
    .isNumeric()
    .withMessage('Rating should be a number')
    .isIn([1, 2, 3, 4, 5])
    .withMessage('Rating should be between 1 and 5'),
  body('reviews.*.comment')
    .isString()
    .withMessage('Review comment should be a string')
    .notEmpty()
    .withMessage('Review comment should not be empty')
];
