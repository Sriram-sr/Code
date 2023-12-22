const { body } = require('express-validator');

exports.signupValidationRules = [
  body('username', 'Username is a required field')
    .notEmpty()
    .not()
    .isNumeric()
    .withMessage('Username field should contain only string and numbers')
    .trim()
    .isLength({ min: 6, max: 25 })
    .withMessage('Username value should be within 6 and 25 characters'),
  body('email', 'Email is a required field')
    .notEmpty()
    .isEmail()
    .withMessage('Please provide a valid email address'),
  body('password', 'Password is a required field')
    .notEmpty()
    .trim()
    .isLength({ min: 6, max: 15 })
    .withMessage('Password value should be within 6 and 25 characters')
    .isStrongPassword()
    .withMessage('Password should be strong'),
  body('role', 'Role is a required field')
    .notEmpty()
    .isIn(['user', 'admin'])
    .withMessage('Role should be one of user or admin only')
];

exports.signinValidationRules = [
  body('email', 'Email is a required field')
    .notEmpty()
    .isEmail()
    .withMessage('Please provide a valid email address'),
  body('password', 'Password is a required field').notEmpty().trim()
];
