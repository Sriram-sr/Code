import { body, ValidationChain } from 'express-validator';

export const emailValidator: ValidationChain = body('email')
  .notEmpty()
  .withMessage('Email is required')
  .isEmail()
  .withMessage('Enter a valid email address')
  .normalizeEmail();

export const passwordValidator: ValidationChain = body('password')
  .notEmpty()
  .withMessage('Password is a required')
  .trim()
  .isLength({ min: 6, max: 15 })
  .withMessage('Password value should be within 6 and 25 characters');

export const signupReqValidator: ValidationChain[] = [
  emailValidator,
  passwordValidator,
  body('role')
    .notEmpty()
    .withMessage('Role is a required')
    .isIn(['admin', 'customer'])
    .withMessage('Role should be one of customer or admin only')
];

export const signinReqValidator: ValidationChain[] = [
  emailValidator,
  passwordValidator
];

export const resetPasswordReqValidator: ValidationChain[] = [
  body('token')
    .notEmpty()
    .withMessage('Token is required')
    .isLength({ min: 64, max: 64 })
    .withMessage('Token must be exactly 64 characters'),
  passwordValidator
];

export const updateUserValidator: ValidationChain[] = [
  body('email')
    .optional()
    .isEmail()
    .withMessage('Enter a valid email address')
    .normalizeEmail(),
  body('mobile')
    .optional()
    .matches(/^\d{10}$/)
    .withMessage('Mobile number should be exactly 10 digits'),
  body('gender')
    .optional()
    .trim()
    .isIn(['male', 'female', 'others'])
    .withMessage('Invalid value for gender')
];
