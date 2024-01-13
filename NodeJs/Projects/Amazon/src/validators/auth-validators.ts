import { body, ValidationChain } from 'express-validator';

export const signupReqValidator: ValidationChain[] = [
  body('firstName').trim().notEmpty().withMessage('First name is required'),
  body('lastName').trim().notEmpty().withMessage('Last name is required'),
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email address'),
  body('mobile')
    .trim()
    .notEmpty()
    .withMessage('Mobile number is required')
    .matches(/^\d{10}$/)
    .withMessage('Mobile number must be 10 digits'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6, max: 15 })
    .withMessage('Password must be at least 6 characters'),
  body('role')
    .notEmpty()
    .withMessage('Role is required')
    .isIn(['admin', 'user'])
    .withMessage('Role should be one of admin/user')
];

export const signinValidator = [
  body('email')
    .notEmpty()
    .withMessage('Email is a required')
    .isEmail()
    .withMessage('Invalid email address'),
  body('password').notEmpty().withMessage('Password is a required').trim()
];

export const updateUserValidator = [
  body('firstName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 10 })
    .withMessage('First name should be within 2 to 10 characters'),
  body('lastName')
    .optional()
    .trim()
    .isLength({ min: 2, max: 10 })
    .withMessage('Last name should be within 2 to 10 characters'),
  body('mobile')
    .trim()
    .optional()
    .matches(/^\d{10}$/)
    .withMessage('Mobile number must be 10 digits')
];
