const express = require('express');
const {
  signupValidationRules,
  signinValidationRules
} = require('../validation/user-validators');
const {
  signupUser,
  signinUser,
  handleForgetPassword,
  resetPassword,
  getCurrentUser
} = require('../controllers/user-controller');
const { isAuth } = require('../middlewares/is-auth');

const router = express.Router();

router.route('/signup').post(signupValidationRules, signupUser);
router.route('/signin').post(signinValidationRules, signinUser);
router.route('/forgot-password').post(handleForgetPassword);
router.route('/reset-password').post(resetPassword);
router.route('/current').get(isAuth, getCurrentUser);

module.exports = router;
