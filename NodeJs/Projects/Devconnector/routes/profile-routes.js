const express = require('express');
const isAuth = require('../middlewares/is-auth');
const profileValidation = require('../validation/profile-validation');
const { getProfile, createProfile} = require('../controllers/profile-controller');

const router = express.Router();

router.route('/').get(isAuth, getProfile).post(profileValidation, isAuth, createProfile);

module.exports = router;