const express = require('express');
const {
  signupUser,
  loginUser,
  handleForgotPassword,
  resetPassword,
  getAllUsers,
  getUserProfile,
  updateUserProfile,
} = require('../controllers/auth-controller');
const {
  validateSignupRequest,
  validateLoginRequest,
  validateEmailField,
  validatePasswordField,
} = require('../validation/user-validation');
const imageParser = require('../utils/image-parser');
const isAuth = require('../middlewares/is-auth');

const router = express.Router();

router.route('/signup').post(validateSignupRequest, signupUser);
router.route('/signin').post(validateLoginRequest, loginUser);
router.route('/forgot-password').post(validateEmailField, handleForgotPassword);
router.route('/reset-password').post(validatePasswordField, resetPassword);
router.route('/').get(isAuth, getAllUsers);
router.route('/current').get(isAuth, getUserProfile);
router
  .route('/update-profile')
  .patch(imageParser.single('profilePicture'), isAuth, updateUserProfile);

module.exports = router;
