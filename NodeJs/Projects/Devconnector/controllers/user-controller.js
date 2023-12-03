const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {
  errorHandler,
  checkFieldsValidation,
} = require('../utils/error-handler');
const { JWTSECUREKEY } = require('../utils/env-values');

// @route   POST api/v1/user/signup
// @desc    Signup User
// @access  Public
const signupUser = (req, res, next) => {
  checkFieldsValidation(req);
  const { name, email, password } = req.body;
  let user;
  bcrypt
    .hash(password, 2)
    .then(hashedPassword => {
      const avatar = gravatar.url(
        email,
        { s: '100', r: 'x', d: 'retro' },
        true
      );
      user = new User({
        name: name,
        email: email,
        password: hashedPassword,
        avatar: avatar,
      });
      return user.save();
    })
    .then(() => {
      res.status(201).json({
        message: 'User registered successfully',
        user: user,
      });
    })
    .catch(err => {
      errorHandler(
        'Something went wrong. Could not able to signup',
        500,
        next,
        err
      );
    });
};

// @route   POST api/v1/user/signin
// @desc    Login User
// @access  Public
const loginUser = (req, res, next) => {
  checkFieldsValidation(req);
  console.log('IT never read this line');
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        return errorHandler('User with this email is not found', 404, next);
      }
      bcrypt
        .compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) {
            return errorHandler(
              'Invalid password, please enter a valid one',
              422,
              next
            );
          }
          const token = jwt.sign(
            { email: email, userId: user._id.toString() },
            JWTSECUREKEY,
            { expiresIn: '1h' }
          );
          res.status(200).json({
            message: 'User logged in successfully',
            token: token,
            user: user,
          });
        })
        .catch(err =>
          errorHandler(
            'Something went wrong, could not able to signin',
            500,
            next,
            err
          )
        );
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not able to signin',
        500,
        next,
        err
      )
    );
};

// @route   GET api/v1/user/current
// @desc    Get Current Loggedin User
// @access  Private
const getCurrentUser = (req, res, next) => {
  User.findById(req.userId)
    .then(user => {
      res.json({
        message: 'Currently logged in user details fetched successfully',
        user: user
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, Could not get current user details',
        500,
        next,
        err
      )
    );
};

module.exports = {
  signupUser,
  loginUser,
  getCurrentUser,
};
