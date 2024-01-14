import { RequestHandler } from 'express';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import {
  HTTP_STATUS,
  errorHandler,
  checkValidationFields
} from '../utils/error-handler';
import { signupReqBody } from '../types/req-body-types';
import { JWT_SECURE_KEY, JWT_EXPIRES_IN } from '../utils/env-values';
import User from '../models/User';

// @route   POST /api/v1/auth/signup
// @desc    Registers user
// @access  Public
export const signupUser: RequestHandler = (req, res, next) => {
  checkValidationFields(req);
  const serverErrorStr =
    'Something went wrong, could not signup user currently';
  const { email, password, role } = req.body as signupReqBody;

  User.findOne({ email: email })
    .then(existingUser => {
      if (existingUser) {
        return errorHandler(
          'User with this email already exists',
          HTTP_STATUS.CONFLICT,
          next
        );
      }
      hash(password, 2)
        .then(hasedPassword => {
          return User.create({
            email,
            password: hasedPassword,
            role,
            cart: [],
            orders: [],
            wishlist: [],
            reviews: []
          });
        })
        .then(user => {
          res.status(HTTP_STATUS.CREATED).json({
            message: 'Successfully registered a user',
            user
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

// @route   POST /api/v1/auth/signin
// @desc    Logs in user
// @access  Public
export const signinUser: RequestHandler = (req, res, next) => {
  checkValidationFields(req);
  const { email, password } = req.body as { email: string; password: string };

  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        return errorHandler(
          'No user found with this email',
          HTTP_STATUS.NOT_FOUND,
          next
        );
      }
      compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) {
            return errorHandler(
              'Password does not match',
              HTTP_STATUS.UNAUTHORIZED,
              next
            );
          }
          const token = sign(
            { email: user.email, userId: user._id.toString() },
            JWT_SECURE_KEY,
            { expiresIn: JWT_EXPIRES_IN }
          );
          res.status(HTTP_STATUS.OK).json({
            message: 'Successfully logged in',
            user,
            token
          });
        })
        .catch(err =>
          errorHandler(
            'Something went wrong, could not signin currently',
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            next,
            err
          )
        );
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not signin currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};

// @route   POST /api/v1/auth/forgot-password
// @desc    Generates a token for resetting password
// @access  Public
export const handleForgetPassword: RequestHandler = (req, res, next) => {
  checkValidationFields(req);
  const serverErrorStr =
    'Something went wrong, could not reset password currently';
  const email = (req.body as { email: string }).email;

  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        return errorHandler(
          'No user found with this email',
          HTTP_STATUS.NOT_FOUND,
          next
        );
      }
      randomBytes(32, (err, buffer) => {
        if (err) {
          return errorHandler(
            'Something went wrong, could not reset password currently',
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            next
          );
        }
        const token = buffer.toString('hex');
        user.resetToken = token;
        user.resetTokenExpiry = new Date(Date.now() + 360000);
        user
          .save()
          .then(() => {
            res.status(HTTP_STATUS.OK).json({
              message: 'Successfully generated token for resetting password',
              token
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
      });
    })
    .catch(err =>
      errorHandler(serverErrorStr, HTTP_STATUS.INTERNAL_SERVER_ERROR, next, err)
    );
};

// @route   POST /api/v1/auth/reset-password
// @desc    Resets new password
// @access  Public
export const resetPassword: RequestHandler = (req, res, next) => {
  checkValidationFields(req);
  const { token, password } = req.body as { token: string; password: string };

  User.findOne({ resetToken: token, resetTokenExpiry: { $gt: Date.now() } })
    .then(user => {
      if (!user) {
        return errorHandler(
          'Invalid token or token may be expired',
          HTTP_STATUS.UNAUTHORIZED,
          next
        );
      }
      hash(password, 2)
        .then(hashedPassword => {
          user.password = hashedPassword;
          user.resetToken = undefined;
          user.resetTokenExpiry = undefined;
          return user.save();
        })
        .then(() => {
          res.status(HTTP_STATUS.OK).json({
            message: 'Successfully resetted password'
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
};
