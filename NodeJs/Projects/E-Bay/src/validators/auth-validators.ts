import { body } from 'express-validator';

export const signupValidator = [
  body('firstname')
    .notEmpty()
    .withMessage('Firstname is required')
    .isLength({ min: 4, max: 10 })
    .matches(/^[a-zA-Z]+$/g)
    .withMessage('Firstname should contain only letters and not numbers'),
  body('lastname')
    .notEmpty()
    .withMessage('Lastname is required')
    .isLength({ min: 4, max: 10 })
    .matches(/^[a-zA-Z]+$/g)
    .withMessage('Lastname should contain only letters and not numbers'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Enter a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6, max: 15 })
    .withMessage('Password should be within 6 to 15 characters')
    .matches(/\d/)
    .withMessage('Password must contain at least one digit.')
    .matches(/[a-zA-Z]/)
    .withMessage('Password must contain at least one letter.')
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage('Password must contain at least one special character.'),
  body('role')
    .notEmpty()
    .withMessage('Role is required')
    .isIn(['admin', 'customer'])
    .withMessage('Enter a valid role')
];
