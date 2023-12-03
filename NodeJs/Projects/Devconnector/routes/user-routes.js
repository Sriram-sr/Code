const express = require('express');
const isAuth = require('../middlewares/is-auth');
const { signupUserValidation, loginUserValidation } = require('../validation/auth-validation');
const { signupUser, loginUser, getCurrentUser } = require('../controllers/user-controller');

const router = express.Router();

router.route('/signup').post(signupUserValidation, signupUser);
router.route('/signin').post(loginUserValidation, loginUser);
router.route('/current').get(isAuth, getCurrentUser);

module.exports = router;
