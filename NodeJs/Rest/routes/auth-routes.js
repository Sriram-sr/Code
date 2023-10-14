const express = require('express');
const { body } = require('express-validator');
const User = require('../models/user');
const authController = require('../controllers/auth');

const router = express.Router();

router.post(
  '/signup',
  [
    body('email', 'Enter valid email')
      .isEmail()
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject('User already exists');
          }
        });
      })
      .normalizeEmail(),
    body('password').isLength({ min: 5 }).trim(),
    body('name').trim().not().isEmpty(),
  ],
  authController.signup
);

router.post(
    '/login',
    body('email', 'Please enter a valid email').isEmail().normalizeEmail(),
    body('password').trim(),
    authController.login
  );

module.exports = router;
