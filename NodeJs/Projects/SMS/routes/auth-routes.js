const express = require('express');
const {
  signupUser,
  loginUser,
  handleForgotPassword,
  resetPassword
} = require('../controllers/auth');
const {
  validateSignupRequest,
  validateLoginRequest,
  validateEmailField,
  validatePasswordField
} = require('../utils/validation');

const router = express.Router();

router
  .route('/forgot-password')
  .post(validateEmailField(), handleForgotPassword);
router
  .route('/reset-password')
  .post(validatePasswordField(), resetPassword);
router.route('/signup').post(validateSignupRequest(), signupUser);
router.route('/login').post(validateLoginRequest(), loginUser);

module.exports = router;
