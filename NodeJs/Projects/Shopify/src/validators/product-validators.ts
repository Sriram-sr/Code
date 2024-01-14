import { body, ValidationChain } from 'express-validator';

export const createProductValidator: ValidationChain[] = [
  body('productName')
    .notEmpty()
    .withMessage('Product name is required')
    .isLength({ max: 255 })
    .withMessage('Product name must be at most 255 characters'),
  body('description')
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 500 })
    .withMessage('Description must be at most 1000 characters'),
  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isNumeric()
    .withMessage('Price must be a number')
    .isFloat({ min: 0 })
    .withMessage('Price must be a non-negative number'),
  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .isString()
    .withMessage('Category must be a string')
    .isIn([
      'Mobiles',
      'Mobile Accessories',
      'Laptops',
      'Desktop PCs',
      'Computer Accessories',
      'Computer Peripherals'
    ])
    .withMessage('Enter a valid category'),
  body('stockQuantity')
    .notEmpty()
    .withMessage('Stock quantity is required')
    .isInt({ min: 0 })
    .withMessage('Stock quantity must be a non-negative integer')
];
