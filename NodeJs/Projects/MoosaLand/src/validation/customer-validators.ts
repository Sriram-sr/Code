import { body } from 'express-validator';

export const customerValidationRules = [
  body('childName')
    .notEmpty()
    .withMessage('Child name is required')
    .isLength({ min: 6, max: 20 })
    .withMessage('Childname should contain atleast 6-20 characters'),
  body('dateOfBirth')
    .notEmpty()
    .withMessage('Date of birth is required')
    .isDate({ format: 'YYYY-MM-DD' })
    .withMessage('Invalid date format, should be in YYYY-MM-DD'),
  body('mobile')
    .notEmpty()
    .withMessage('Mobile number is required')
    .isMobilePhone('any')
    .withMessage('Invalid mobile number')
    .isLength({ min: 10, max: 12 })
    .withMessage('Mobile number should not exceed  12 characters'),
  body('packageName')
    .notEmpty()
    .withMessage('Package name is required')
    .isIn(['single', 'four_visit', 'six_visit', 'ten_visit', 'six_months'])
    .withMessage('Invalid package name'),
  body('noOfChild')
    .notEmpty()
    .withMessage('Number of child is required')
    .isInt({ min: 1 })
    .withMessage('Number of children should be a positive integer'),
  body('noOfSocks')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Number of socks should be a positive integer'),
  body('discount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Discount should be a positive number or zero'),
  body('paymentMode')
    .notEmpty()
    .withMessage('Payment mode is required')
    .isIn(['card', 'cash', 'gpay'])
    .withMessage('Invalid payment mode')
];
