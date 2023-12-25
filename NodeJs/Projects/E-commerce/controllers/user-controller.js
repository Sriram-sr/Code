const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { COOKIE_EXPIRY } = require('../utils/env-values');
const User = require('../models/User');
const {
  checkFieldsValidation,
  errorHandler,
  HTTP_STATUS
} = require('../utils/error-handler');

// @route   POST api/v1/user/signup
// @desc    Registers a user
// @access  Public
const signupUser = (req, res, next) => {
  checkFieldsValidation(req);
  const { username, email, password, role } = req.body;
  User.findOne({ email: email })
    .then(user => {
      if (user) {
        return errorHandler(
          'User with this email already exists',
          HTTP_STATUS.CONFLICT,
          next
        );
      }
      bcrypt
        .hash(password, 2)
        .then(hashedPassword => {
          const newUser = new User({
            username,
            email,
            password: hashedPassword,
            avatar: {
              publicId: 'SomeDummy123ID',
              url: 'www.dummyavatar.com/avt12l'
            },
            role
          });
          return newUser.save();
        })
        .then(registeredUser => {
          const token = registeredUser.getJwtToken();
          res.status(HTTP_STATUS.OK).json({
            message: 'Successfully registered user',
            token,
            user: registeredUser
          });
        })
        .catch(err =>
          errorHandler(
            'Something went wrong, could not signup currently',
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            next,
            err
          )
        );
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not signup currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};

// @route   POST api/v1/user/signin
// @desc    Logins a user
// @access  Public
const signinUser = (req, res, next) => {
  checkFieldsValidation(req);
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        return errorHandler(
          'No user with this email found',
          HTTP_STATUS.UNAUTHORIZED,
          next
        );
      }
      bcrypt
        .compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) {
            return errorHandler(
              'Password for this user is wrong, please enter a valid one',
              HTTP_STATUS.UNAUTHORIZED,
              next
            );
          }
          const token = user.getJwtToken();
          const cookieOptions = {
            expires: new Date(Date.now() + COOKIE_EXPIRY * 24 * 60 * 60 * 1000),
            httpOnly: true
          };
          res
            .status(HTTP_STATUS.OK)
            .cookie('token', token, cookieOptions)
            .json({
              message: 'Successfully logged in user',
              token: token,
              user: user
            });
        })
        .catch(err =>
          errorHandler(
            'Something went wrong, could not signup currently',
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            next,
            err
          )
        );
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not signup currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};

// @route   POST api/v1/user/forget-password
// @desc    Generates a token for resetting password
// @access  Public
const handleForgetPassword = (req, res, next) => {
  const { email } = req.body;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        return errorHandler(
          'User with this email not found',
          HTTP_STATUS.NOT_FOUND,
          next
        );
      }
      crypto.randomBytes(32, (err, buffer) => {
        if (err) {
          return errorHandler(
            'Something went wrong, could not reset password currently',
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            next,
            err
          );
        }
        const token = buffer.toString('hex');
        user.resetPasswordToken = token;
        user.resetTokenExpiry = Date.now() + 360000;
        user
          .save()
          .then(() => {
            res.status(HTTP_STATUS.OK).json({
              message: 'Token generated successfully for resetting password',
              token
            });
          })
          .catch(err =>
            errorHandler(
              'Something went wrong, could not reset password currently',
              HTTP_STATUS.INTERNAL_SERVER_ERROR,
              next,
              err
            )
          );
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not reset password currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};

// @route   POST api/v1/user/reset-password
// @desc    Validates token and resets password
// @access  Public
const resetPassword = (req, res, next) => {
  const { token, password } = req.body;
  User.findOne({
    resetPasswordToken: token,
    resetTokenExpiry: { $gt: Date.now() }
  })
    .then(user => {
      if (!user) {
        return errorHandler(
          'User with token not found or token may be expired',
          HTTP_STATUS.NOT_FOUND,
          next
        );
      }
      bcrypt
        .hash(password, 2)
        .then(newPassword => {
          user.password = newPassword;
          user.resetPasswordToken = undefined;
          user.resetTokenExpiry = undefined;
          user
            .save()
            .then(() => {
              res.status(HTTP_STATUS.OK).json({
                message: 'Successfully resetted pasword'
              });
            })
            .catch(err =>
              errorHandler(
                'Something went wrong, could not reset password currently',
                HTTP_STATUS.INTERNAL_SERVER_ERROR,
                next,
                err
              )
            );
        })
        .catch(err =>
          errorHandler(
            'Something went wrong, could not reset password currently',
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            next,
            err
          )
        );
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not reset password currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};

// @route   POST api/v1/user/update-password
// @desc    Updates new password
// @access  Private
const updatePassword = (req, res, next) => {
  const serverErrorStr =
    'Something went wrong, could not update password currently';
  const { oldPassword, newPassword } = req.body;
  User.findById(req.userId)
    .then(user => {
      bcrypt
        .compare(oldPassword, user.password)
        .then(isMatch => {
          if (!isMatch) {
            return errorHandler(
              'User entered wrong old password',
              HTTP_STATUS.CONFLICT,
              next
            );
          }
          bcrypt
            .hash(newPassword, 2)
            .then(hashedPassword => {
              user.password = hashedPassword;
              return user.save();
            })
            .then(() => {
              res.status(HTTP_STATUS.OK).json({
                message: 'Successfully updated password'
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

// @route   POST api/v1/user
// @desc    Gets currently logged in user
// @access  Private
const getCurrentUser = (req, res, next) => {
  User.findById(req.userId)
    .then(user => {
      res.status(HTTP_STATUS.OK).json({
        message: 'Successfully retrived current logged in user',
        user
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not get user details currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};

// @route   PATCH api/v1/user/
// @desc    Updates the user
// @access  Private
const updateUser = (req, res, next) => {
  User.findByIdAndUpdate(req.userId, req.body, {
    new: true
  })
    .then(updatedUser => {
      res.status(HTTP_STATUS.OK).json({
        message: 'Successfully updated user',
        user: updatedUser
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not update user details currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};

module.exports = {
  signupUser,
  signinUser,
  handleForgetPassword,
  resetPassword,
  updatePassword,
  getCurrentUser,
  updateUser
};
