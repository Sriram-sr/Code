import { body, ValidationChain } from 'express-validator';

export const signupRules: ValidationChain[] = [
  body('email')
    .notEmpty()
    .withMessage('Email is a required')
    .isEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .notEmpty()
    .withMessage('Password is a required')
    .trim()
    .isLength({ min: 6, max: 15 })
    .withMessage('Password value should be within 6 and 25 characters'),
  body('role')
    .notEmpty()
    .withMessage('Role is a required')
    .isIn(['admin', 'customer'])
    .withMessage('Role should be one of customer or admin only')
];                       
