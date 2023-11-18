const { check, body } = require('express-validator');
const User = require('../models/user');

const createPostValidation = [
  check('title', 'Title of place should not be empty').not().isEmpty(),
  check(
    'description',
    'Description characters should be more than 5 in length'
  ).isLength({ min: 5 }),
  check('address', 'Address for place should not be empty').not().isEmpty()
];

const signupUserValidation = [
  body('email')
    .isEmail()
    .withMessage('Enter a valid email')
    .normalizeEmail()
    .custom((value, { req }) => {
      return User.findOne({ email: value }).then(userDoc => {
        if (userDoc) {
          return Promise.reject('User already exists, enter a valid email');
        }
        return true;
      });
    }),
  body('password')
    .trim()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

const loginUserValidation = [
  body('email').isEmail().withMessage('Enter a valid email').normalizeEmail(),
  body('password').trim().not().isEmpty()
];

module.exports = { signupUserValidation, loginUserValidation, createPostValidation };
