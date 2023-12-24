const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const { COOKIE_EXPIRY } = require('../utils/env-values')
const User = require('../models/User')
const {
  checkFieldsValidation,
  errorHandler
} = require('../utils/error-handler')

// @route   POST api/v1/user/signup
// @desc    Registers a user
// @access  Public
const signupUser = (req, res, next) => {
  checkFieldsValidation(req)
  const { username, email, password, role } = req.body
  User.findOne({ email: email })
    .then(user => {
      if (user) {
        return errorHandler('User with this email already exists', 409, next)
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
          })
          return newUser.save()
        })
        .then(registeredUser => {
          const token = registeredUser.getJwtToken()
          res.status(200).json({
            message: 'Successfully registered user',
            token,
            user: registeredUser
          })
        })
        .catch(err =>
          errorHandler(
            'Something went wrong, could not signup currently',
            500,
            next,
            err
          )
        )
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not signup currently',
        500,
        next,
        err
      )
    )
}

// @route   POST api/v1/user/signin
// @desc    Logins a user
// @access  Public
const signinUser = (req, res, next) => {
  checkFieldsValidation(req)
  const { email, password } = req.body
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        return errorHandler('No user with this email found', 401, next)
      }
      bcrypt
        .compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) {
            return errorHandler(
              'Password for this user is wrong, please enter a valid one',
              401,
              next
            )
          }
          const token = user.getJwtToken()
          const cookieOptions = {
            expires: new Date(Date.now() + COOKIE_EXPIRY * 24 * 60 * 60 * 1000),
            httpOnly: true
          }
          res.status(200).cookie('token', token, cookieOptions).json({
            message: 'Successfully logged in user',
            token: token,
            user: user
          })
        })
        .catch(err =>
          errorHandler(
            'Something went wrong, could not signup currently',
            500,
            next,
            err
          )
        )
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not signup currently',
        500,
        next,
        err
      )
    )
}

// @route   POST api/v1/user/forget-password
// @desc    Generates a token for resetting password
// @access  Public
const handleForgetPassword = (req, res, next) => {
  const { email } = req.body
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        return errorHandler('User with this email not found', 404, next)
      }
      crypto.randomBytes(32, (err, buffer) => {
        if (err) {
          return errorHandler(
            'Something went wrong, could not reset password currently',
            500,
            next,
            err
          )
        }
        const token = buffer.toString('hex')
        user.resetPasswordToken = token
        user.resetTokenExpiry = Date.now() + 360000
        user
          .save()
          .then(() => {
            res.status(200).json({
              message: 'Token generated successfully for resetting password',
              token
            })
          })
          .catch(err =>
            errorHandler(
              'Something went wrong, could not reset password currently',
              500,
              next,
              err
            )
          )
      })
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not reset password currently',
        500,
        next,
        err
      )
    )
}

// @route   POST api/v1/user/reset-password
// @desc    Validates token and resets password
// @access  Public
const resetPassword = (req, res, next) => {
  const { token, password } = req.body
  User.findOne({
    resetPasswordToken: token,
    resetTokenExpiry: { $gt: Date.now() }
  })
    .then(user => {
      if (!user) {
        return errorHandler(
          'User with token not found or token may be expired',
          404,
          next
        )
      }
      bcrypt
        .hash(password, 2)
        .then(newPassword => {
          user.password = newPassword
          user.resetPasswordToken = undefined
          user.resetTokenExpiry = undefined
          user
            .save()
            .then(() => {
              res.status(200).json({
                message: 'Successfully resetted pasword'
              })
            })
            .catch(err =>
              errorHandler(
                'Something went wrong, could not reset password currently',
                500,
                next,
                err
              )
            )
        })
        .catch(err =>
          errorHandler(
            'Something went wrong, could not reset password currently',
            500,
            next,
            err
          )
        )
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not reset password currently',
        500,
        next,
        err
      )
    )
}

// @route   POST api/v1/user/current
// @desc    Gets currently logged in user
// @access  Private
const getCurrentUser = (req, res, next) => {
  User.findById(req.userId)
    .then(user => {
      res.status(200).json({
        message: 'Successfully retrived current logged in user',
        user
      })
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not get user details currently',
        500,
        next,
        err
      )
    )
}

module.exports = {
  signupUser,
  signinUser,
  handleForgetPassword,
  resetPassword,
  getCurrentUser
}
