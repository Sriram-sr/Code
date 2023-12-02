const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const { JWTSECUREKEY } = require('../utils/env-values');
const {
  errorHandler,
  checkFieldsValidation
} = require('../utils/error-handler');

const raiseUserNotFoundError = message => {
  const errorMessage = message || 'User with this email not found';
  const error = new Error(errorMessage);
  error.statusCode = 422;
  throw error;
};

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

const loginUser = (req, res, next) => {
  checkFieldsValidation(req);
  const { email, password } = req.body;
  let loadedUser;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        raiseUserNotFoundError();
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

const handleForgotPassword = (req, res, next) => {
  checkFieldsValidation(req);
  const email = req.body.email;
  let token;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        raiseUserNotFoundError(
          'User with token not found or token may be expired'
        );
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

const resetPassword = (req, res, next) => {
  checkFieldsValidation(req);
  const { password, token } = req.body;
  User.findOne({ resetToken: token, resetTokenExpiry: { $gt: Date.now() } })
    .then(user => {
      if (!user) {
        raiseUserNotFoundError(
          'User with token not found or token may be expired'
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
            message: 'Successfully changed password'
          });
        })
        .catch(err => errorHandler(err, next));
    })
    .catch(err => errorHandler(err, next));
};

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
        console.log(currentUser);
        const error = new Error('Only admin can view all users');
        error.statusCode = 403;
        throw error;
      }
      res.status(200).json({
        message: 'Users fetched successfully',
        totalUsers: users.length,
        users: users
      });
    })
    .catch(err => errorHandler(err, next));
};

const getUserProfile = (req, res, next) => {
  User.findById(req.userId)
    .select('email role bio profilePicture -_id')
    .then(user => {
      if (!user) {
        raiseUserNotFoundError();
      }
      res
        .status(200)
        .json({ message: 'User fetched successfully', user: user });
    })
    .catch(err => errorHandler(err, next));
};

const updateUserProfile = (req, res, next) => {
  const { bio } = req.body;
  User.findById(req.userId)
    .then(user => {
      if (!user) {
        raiseUserNotFoundError();
      }
      if (!req.file) {
        const error = new Error(
          'No Image uploaded or please check the image format'
        );
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

module.exports = {
  signupUser,
  loginUser,
  handleForgotPassword,
  resetPassword,
  getAllUsers,
  getUserProfile,
  updateUserProfile
};
