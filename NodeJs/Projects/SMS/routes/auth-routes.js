const express = require('express');
const { signupUser, loginUser } = require('../controllers/auth');
const {
  validateSignupRequest,
  validateLoginRequest
} = require('../utils/validation');

const router = express.Router();

router.post('/signup', validateSignupRequest(), signupUser);
router.post('/login', validateLoginRequest(), loginUser);

module.exports = router;
