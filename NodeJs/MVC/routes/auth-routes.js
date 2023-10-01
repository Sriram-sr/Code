const express = require('express');
const authController = require('../controllers/auth');
const { check, body } = require('express-validator');
const User = require('../models/user');

const router = express.Router();

router.get('/register', authController.getRegister);
router.get('/login', authController.getLogin);
router.get('/reset/:token', authController.getNewPassword);
router.get('/reset', authController.getReset);
router.post(
  '/login',
  body('email', 'Please enter a valid email').isEmail().normalizeEmail(),
  body('password').trim(),
  authController.postLogin
);
router.post(
  '/register',
  [
    check('email', 'Please enter a valid email')
      .isEmail()
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject('User already exeists');
          }
        });
      })
      .normalizeEmail(),
    body(
      'password',
      'Please enter only text that contains numbers and string and characters should be larger than 5 in length'
    )
      .isLength({ min: 5 })
      .isAlphanumeric().trim(),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords have to Match');
      }
      return true;
    }).trim()
  ],
  authController.postRegister
);
router.post('/logout', authController.postLogout);
router.post('/reset', authController.postReset);
router.post('/new-password', authController.postNewPassword);

module.exports = router;
