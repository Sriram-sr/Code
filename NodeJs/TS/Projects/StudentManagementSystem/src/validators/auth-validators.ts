import { body } from 'express-validator';

export const signupRules = [
  body('email')
    .notEmpty()
    .withMessage('Email is a required field')
    .isEmail()
    .withMessage('Please provide a valid email address'),

  body('password')
    .notEmpty()
    .withMessage('Password is a required field')
    .trim()
    .isLength({ min: 6, max: 15 })
    .withMessage('Password value should be within 6 and 25 characters')
    .isStrongPassword()
    .withMessage('Password should be strong'),

  body('role')
    .notEmpty()
    .withMessage('Role is a required field')
    .isIn(['admin', 'teacher', 'student'])
    .withMessage('Role should be one of user or admin only')
];

export const signinRules = [
  body('email')
    .notEmpty()
    .withMessage('Email is a required field')
    .isEmail()
    .withMessage('Please provide a valid email address'),

  body('password').notEmpty().withMessage('Password is a required field').trim()
];
