const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const { JWTSECUREKEY } = require('../utils/env-values');
const {
  errorHandler,
  checkFieldsValidation,
} = require('../utils/error-handler');

// @route   POST api/v1/user/signup/
// @desc    Signup User
// @access  Public
const signupUser = (req, res, next) => {
  checkFieldsValidation(req);
  const { email, password, role } = req.body;
  let user;
  bcrypt
    .hash(password, 2)
    .then(hashedPassword => {
      user = new User({
        email: email,
        password: hashedPassword,
        role: role,
      });
      return user.save();
    })
    .then(() => {
      res.status(201).json({
        message: 'User registered successfully',
        user: user,
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong. Could not able to signup currently',
        500,
        next,
        err
      )
    );
};

// @route   POST api/v1/user/signin/
// @desc    Login User
// @access  Public
const loginUser = (req, res, next) => {
  checkFieldsValidation(req);
  const { email, password } = req.body;
  let loadedUser;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        return errorHandler('User with this email not found', 422, next);
      }
      loadedUser = user;
      bcrypt
        .compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) {
            return errorHandler('Please enter a valid password', 422, next);
          }
          const token = jwt.sign(
            { email: loadedUser.email, userId: loadedUser._id.toString() },
            JWTSECUREKEY,
            { expiresIn: '1h' }
          );
          res.status(200).json({
            token: token,
            user: loadedUser,
          });
        })
        .catch(err =>
          errorHandler(
            'Something went wrong. Could not able to signin currently',
            500,
            next,
            err
          )()
        );
    })
    .catch(err =>
      errorHandler(
        'Something went wrong. Could not able to signin currently',
        500,
        next,
        err
      )
    );
};

// @route   POST api/v1/user/forgot-password/
// @desc    Returns a token for resetting password
// @access  Public
const handleForgotPassword = (req, res, next) => {
  checkFieldsValidation(req);
  const email = req.body.email;
  let token;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        return errorHandler(
          'User with token not found or token may be expired',
          422,
          next
        );
      }
      crypto.randomBytes(32, (err, buffer) => {
        if (err) {
          errorHandler(
            'Something went wrong. Could not able to reset password currently',
            500,
            next,
            err
          );
        }
        token = buffer.toString('hex');
        user.resetToken = token;
        user.resetTokenExpiry = Date.now() + 360000;
        user.save();
        res.status(200).json({
          message: 'Token generated successfully for resetting password',
          token: token,
        });
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong. Could not able to reset password currently',
        500,
        next,
        err
      )
    );
};

// @route   POST api/v1/user/reset-password/
// @desc    Resets new password for the user
// @access  Public
const resetPassword = (req, res, next) => {
  checkFieldsValidation(req);
  const { password, token } = req.body;
  User.findOne({ resetToken: token, resetTokenExpiry: { $gt: Date.now() } })
    .then(user => {
      if (!user) {
        return errorHandler(
          'User with token not found or token may be expired',
          404,
          next
        );
      }
      bcrypt
        .hash(password, 2)
        .then(hashedPassword => {
          user.password = hashedPassword;
          user.resetToken = undefined;
          user.resetTokenExpiry = undefined;
          return user.save();
        })
        .then(() => {
          res.status(200).json({
            message: 'Successfully changed password',
          });
        })
        .catch(err =>
          errorHandler(
            'Something went wrong. Could not able to reset password currently',
            500,
            next,
            err
          )
        );
    })
    .catch(err =>
      errorHandler(
        'Something went wrong. Could not able to reset password currently',
        500,
        next,
        err
      )
    );
};

// @route   GET api/v1/user/
// @desc    Gets all users(admin api)
// @access  Private
const getAllUsers = (req, res, next) => {
  let currentUser;
  User.find()
    .then(users => {
      users.map(user => {
        if (user._id.toString() === req.userId) {
          currentUser = user;
        }
      });
      if (currentUser.role !== 'admin') {
        return errorHandler('Only admin can view all users', 403, next);
      }
      res.status(200).json({
        message: 'Succesfully fetched all users',
        totalUsers: users.length,
        users: users,
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong. Could not able to get users currently',
        500,
        next,
        err
      )
    );
};

// @route   GET api/v1/user/current
// @desc    Gets current user
// @access  Private
const getUserProfile = (req, res, next) => {
  User.findById(req.userId)
    .select('email role bio profilePicture -_id')
    .then(user => {
      res
        .status(200)
        .json({ message: 'User fetched successfully', user: user });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong. Could not able to get users currently',
        500,
        next,
        err
      )
    );
};

// @route   PATCH api/v1/user/update-profile
// @desc    Updates user profile
// @access  Private
const updateUserProfile = (req, res, next) => {
  const { bio } = req.body;
  User.findById(req.userId)
    .then(user => {
      if (!req.file) {
        return errorHandler(
          'No Image uploaded or please check the image format',
          422,
          next
        );
      }
      user.profilePicture = req.file.path;
      user.bio = bio;
      user
        .save()
        .then(() => {
          res.status(200).json({
            message: 'Profile updated successfully',
          });
        })
        .catch(err =>
          errorHandler(
            'Something went wrong. Could not able to update user profile currently',
            500,
            next,
            err
          )
        );
    })
    .catch(err =>
      errorHandler(
        'Something went wrong. Could not able to update user profile currently',
        500,
        next,
        err
      )
    );
};

module.exports = {
  signupUser,
  loginUser,
  handleForgotPassword,
  resetPassword,
  getAllUsers,
  getUserProfile,
  updateUserProfile,
};
