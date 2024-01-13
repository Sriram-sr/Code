import { body } from 'express-validator';

export const createProductValidator = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 50, min: 8 })
    .trim(),
  body('description')
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ max: 100 }),
  body('price')
    .notEmpty()
    .withMessage('Price is required')
    .isInt()
    .withMessage('Price should be a number'),
  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .isIn([
      'Mobiles',
      'Mobile Accessories',
      'Laptops',
      'Desktop PCs',
      'Computer Accessories',
      'Computer Peripherals'
    ])
    .withMessage('Enter a valid category'),
  body('quantity')
    .notEmpty()
    .withMessage('Quantity is required')
    .isInt()
    .withMessage('Quantity should be a number'),
  body('brand')
    .notEmpty()
    .withMessage('Brand is required')
    .isIn([
      'Lenovo',
      'Apple',
      'Samsung',
      'Hp',
      'Acer',
      'Dell',
      'Microsoft',
      'Asus',
      'Infinix'
    ])
    .withMessage('Enter a valid Brand')
];