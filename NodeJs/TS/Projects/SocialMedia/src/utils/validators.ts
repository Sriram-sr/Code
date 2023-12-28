import { body } from 'express-validator';

export const signupUserRules = [
  body('email').isEmail().withMessage('Please provide a valid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Name is required field')
    .isLength({ max: 20 })
    .withMessage('Name should not exceed 20 characters')
];
