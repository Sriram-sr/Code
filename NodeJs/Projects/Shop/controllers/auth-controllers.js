const bcrtpt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {
  JWTSECUREKEY,
  JWTTOKENEXPIRY,
  COOKIE_EXPIRY_DAYS
} = require('../utils/env-values');
const { HTTP_STATUS, errorHandler } = require('../utils/error-handler');

// @route   POST /api/v1/auth/signup
// @desc    Registers a user
// @access  Public
exports.signupUser = (req, res, next) => {
  const serverErrorStr = 'Something went wrong, could not signup currently';
  const { email, password } = req.body;

  User.findOne({ email: email })
    .then(user => {
      if (user) {
        return errorHandler('User with this email already exists', 409, next);
      }
      bcrtpt
        .hash(password, 2)
        .then(hashedPassword => {
          const newUser = new User({
            email,
            password: hashedPassword,
            cart: []
          });
          return newUser.save();
        })
        .then(registeredUser => {
          res.status(HTTP_STATUS.CREATED).json({
            message: 'Successfully registered user',
            user: registeredUser
          });
        })
        .catch(err =>
          errorHandler(
            serverErrorStr,
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            next,
            err
          )
        );
    })
    .catch(err =>
      errorHandler(serverErrorStr, HTTP_STATUS.INTERNAL_SERVER_ERROR, next, err)
    );
};

// @route   POST /api/v1/auth/signup
// @desc    Registers a user
// @access  Public
exports.signinUser = (req, res, next) => {
  const { email, password } = req.body;
  const serverErrorStr =
    'Something went wrong, could not signin user currently';

  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        return errorHandler('User with this email not found', 404, next);
      }
      bcrtpt.compare(password, user.password).then(isMatch => {
        if (!isMatch) {
          return errorHandler(
            'Password for this user is wrong, please enter a valid one',
            401,
            next
          );
        }
        const token = jwt.sign(
          { email: user.email, userId: user._id.toString() },
          JWTSECUREKEY,
          { expiresIn: JWTTOKENEXPIRY }
        );
        const { password, ...userObject } = user.toObject();
        const cookieOptions = {
          expires: new Date(
            Date.now() + COOKIE_EXPIRY_DAYS * 24 * 60 * 60 * 1000
          ),
          httpOnly: true
        };
        res.status(HTTP_STATUS.OK).cookie('token', token, cookieOptions).json({
          message: 'Successfully logged in user',
          user: userObject,
          token
        });
      });
    })
    .catch(err =>
      errorHandler(serverErrorStr, HTTP_STATUS.INTERNAL_SERVER_ERROR, next, err)
    );
};
