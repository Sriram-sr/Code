const express = require('express');
const {
  signupValidationRules,
  signinValidationRules
} = require('../validation/user-validators');
const {
  signupUser,
  signinUser,
  handleForgetPassword,
  resetPassword
} = require('../controllers/user-controller');

const router = express.Router();

router.route('/signup').post(signupValidationRules, signupUser);
router.route('/signin').post(signinValidationRules, signinUser);
router.route('/forgot-password').post(handleForgetPassword);
router.route('/reset-password').post(resetPassword);

module.exports = router;
