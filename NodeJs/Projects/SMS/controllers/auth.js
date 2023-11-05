const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
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
