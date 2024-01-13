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
    .withMessage('Password must be at least 6 characters')
];

export const signinValidator = [
  body('email')
    .notEmpty()
    .withMessage('Email is a required')
    .isEmail()
    .withMessage('Invalid email address'),
  body('password').notEmpty().withMessage('Password is a required').trim()
];
