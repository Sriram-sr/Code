const express = require('express');
const { isAuth } = require('../middlewares/is-auth');
const {
  signupValidationRules,
  signinValidationRules
} = require('../validation/user-validators');
const {
  signupUser,
  signinUser,
  handleForgetPassword,
  resetPassword,
  updatePassword,
  getCurrentUser,
  updateUser
} = require('../controllers/user-controller');

const router = express.Router();

router.route('/signup').post(signupValidationRules, signupUser);
router.route('/signin').post(signinValidationRules, signinUser);
router.route('/forgot-password').post(handleForgetPassword);
router.route('/reset-password').post(resetPassword);
router.route('/update-password').post(isAuth, updatePassword);
router.route('/').get(isAuth, getCurrentUser).patch(isAuth, updateUser);

module.exports = router;
