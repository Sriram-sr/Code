const express = require('express');
const { signupUserValidation, loginUserValidation } = require('../utils/validation');
const { signupUser, loginUser } = require('../controllers/auth-controllers');

const router = express.Router();

router.route('/signup').post(signupUserValidation, signupUser);
router.route('/login').post(loginUserValidation, loginUser);

module.exports = router;
