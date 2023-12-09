const { body } = require('express-validator');
const User = require('../models/User');

const validateSignupRequest = [
  body('email', 'Please enter a valid email')
    .isEmail()
    .custom((value, { req }) => {
      return User.findOne({ email: value }).then(userDoc => {
        if (userDoc) {
          return Promise.reject('User already exists');
        }
        return true;
      });
    })
    .normalizeEmail(),
  body(
    'password',
    'Password length should be more than 5 and should contain text and numbers only'
  )
    .trim()
    .isLength({ min: 5 }),
  body('role', 'Please provide boolean value True/False').trim().not(),
];

const validateLoginRequest = [
  body('email', 'Please provide a valid email').isEmail().normalizeEmail(),
  body('password').trim(),
];

const validateEmailField = body('email', 'Please provide a valid email')
  .isEmail()
  .normalizeEmail();

const validatePasswordField = body(
  'password',
  'Password length should be more than 5 and should contain text and numbers only'
)
  .trim()
  .isLength({ min: 5 });

module.exports = {
  validateSignupRequest,
  validateLoginRequest,
  validateEmailField,
  validatePasswordField,
};
