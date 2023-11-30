const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const { JWTSECUREKEY } = require('../utils/env-values');
const {
  errorHandler,
  checkFieldsValidation
} = require('../utils/error-handler');

exports.signupUser = (req, res, next) => {
  checkFieldsValidation(req);
  const { email, password, role } = req.body;
  let user;
  bcrypt
    .hash(password, 2)
    .then(hashedPassword => {
      user = new User({
        email: email,
        password: hashedPassword,
        role: role
      });
      return user.save();
    })
    .then(() => {
      res.status(201).json({
        message: 'User registered successfully',
        user: user
      });
    })
    .catch(err => {
      errorHandler(err, next);
    });
};

exports.loginUser = (req, res, next) => {
  checkFieldsValidation(req);
  const { email, password } = req.body;
  let loadedUser;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        const error = new Error('User with this email not found');
        error.statusCode = 422;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isMatch => {
      if (!isMatch) {
        const error = new Error('Please enter a valid password');
        error.statusCode = 422;
        throw error;
      }
      const token = jwt.sign(
        { email: loadedUser.email, userId: loadedUser._id.toString() },
        JWTSECUREKEY,
        { expiresIn: '1h' }
      );
      res.status(200).json({
        token: token,
        user: loadedUser
      });
    })
    .catch(err => {
      errorHandler(err, next);
    });
};

exports.handleForgotPassword = (req, res, next) => {
  checkFieldsValidation(req);
  const email = req.body.email;
  let token;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        const error = new Error('User with this email not found');
        error.statusCode = 422;
        throw error;
      }
      crypto.randomBytes(32, (err, buffer) => {
        if (err) {
          errorHandler(err, next);
        }
        token = buffer.toString('hex');
        user.resetToken = token;
        user.resetTokenExpiry = Date.now() + 360000;
        user.save();
        res.status(200).json({
          message: 'Token generated successfully for resetting password',
          token: token
        });
      });
    })
    .catch(err => errorHandler(err, next));
};

exports.resetPassword = (req, res, next) => {
  checkFieldsValidation(req);
  const { password, token } = req.body;
  User.findOne({ resetToken: token, resetTokenExpiry: { $gt: Date.now() } })
    .then(user => {
      if (!user) {
        const error = new Error(
          'User with token not found or token may be expired'
        );
        error.statusCode = 422;
        throw error;
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
            message: 'Successfully changed password'
          });
        })
        .catch(err => errorHandler(err, next));
    })
    .catch(err => errorHandler(err, next));
};

exports.updateUserProfile = (req, res, next) => {
  const { bio } = req.body;
  User.findById(req.userId)
    .then(user => {
      if (!req.file) {
        const error = new Error('No Image uploaded');
        error.statusCode = 422;
        throw error;
      }
      user.profilePicture = req.file.path;
      user.bio = bio;
      return user.save();
    })
    .then(() => {
      res.status(200).json({
        message: 'Profile updated successfully'
      });
    })
    .catch(err => errorHandler(err, next));
};
