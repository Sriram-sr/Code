import { RequestHandler } from 'express';
import { hash, compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import {
  HTTP_STATUS,
  errorHandler,
  checkValidationFields
} from '../utils/error-handler';
import {
  JWT_SECURE_KEY,
  JWT_EXPIRES_IN,
  COOKIE_EXPIRY_DAYS
} from '../utils/env-values';
import {
  CustomRequest,
  signinReqBody,
  signupReqBody,
  forgetPasswordReqBody,
  resetPasswordReqBody,
  updateProfileReqBody
} from '../Types/req-body-types';
import User from '../models/User';

type cookieOptionsType = {
  expires: Date;
  httpOnly: boolean;
};

// @route   POST api/v1/auth/signup/
// @desc    Registers a user
// @access  Public
export const signupUser: RequestHandler = (req, res, next) => {
  const serverErrorStr =
    'Something went wrong, could not signup user currently';
  checkValidationFields(req);
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
            role
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

// @route   POST api/v1/auth/signin/
// @desc    Log in a user
// @access  Public
export const signinUser: RequestHandler = (req, res, next) => {
  const serverErrorStr = 'Something went wrong, could not signin currently';

  checkValidationFields(req);
  const { email, password } = req.body as signinReqBody;
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
              'Password for this user is invalid',
              HTTP_STATUS.UNAUTHORIZED,
              next
            );
          }
          let token = '';
          try {
            token = jwt.sign(
              { email: email, userId: user._id.toString() },
              JWT_SECURE_KEY,
              { expiresIn: JWT_EXPIRES_IN }
            );
            const cookieOptions: cookieOptionsType = {
              expires: new Date(
                Date.now() + COOKIE_EXPIRY_DAYS * 24 * 60 * 60 * 1000
              ),
              httpOnly: true
            };
            res
              .cookie('token', token, cookieOptions)
              .status(HTTP_STATUS.OK)
              .json({
                message: 'Successfully logged in user',
                user,
                token
              });
          } catch (err) {
            return errorHandler(
              serverErrorStr,
              HTTP_STATUS.INTERNAL_SERVER_ERROR,
              next,
              err
            );
          }
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

// @route   POST api/v1/auth/forgot-password/
// @desc    Generates token for resetting password
// @access  Public
export const handleForgetPassword: RequestHandler = (req, res, next) => {
  const serverErrorStr =
    'Something went wrong, could not reset password currently';

  const { email } = req.body as forgetPasswordReqBody;
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
            serverErrorStr,
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            next,
            err
          );
        }
        const token = buffer.toString('hex');
        user.resetToken = token;
        user.resetTokenExpiry = new Date(Date.now() + 360000);
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

// @route   POST api/v1/auth/reset-password/
// @desc    Resets new password for the user
// @access  Public
export const resetPassword: RequestHandler = (req, res, next) => {
  const { token, password } = req.body as resetPasswordReqBody;
  User.findOne({ resetToken: token, resetTokenExpiry: { $gt: Date.now() } })
    .then(user => {
      if (!user) {
        return errorHandler(
          'Token for resetting password is invalid or may be expired',
          HTTP_STATUS.NOT_FOUND,
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
            message: 'Password changed successfully'
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

// @route   GET api/v1/auth/all-users
// @desc    Gets list of all users
// @access  Private(Admin)
export const getAllUsers: RequestHandler = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 3;
  User.find()
    .skip((+currentPage - 1) * perPage)
    .limit(perPage)
    .then(users => {
      res.status(HTTP_STATUS.OK).json({
        message: 'Successfully fetched users',
        totalUsers: users.length,
        users
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not get users currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};

// @route   GET api/v1/auth/user/
// @desc    Gets user profile information
// @access  Private
export const getUserProfile: RequestHandler = (
  req: CustomRequest,
  res,
  next
) => {
  User.findById(req.userId)
    .select('-password')
    .then(user => {
      res.status(HTTP_STATUS.OK).json({
        message: 'Successfully fetched the user profile',
        user
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not get user profile currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};

// @route   PATCH api/v1/auth/update-profile/
// @desc    Updates user profile
// @access  Private
export const updateProfile: RequestHandler = (
  req: CustomRequest,
  res,
  next
) => {
  console.log('Reached request');
  if (!req.file) {
    return errorHandler(
      'No image uploaded for profile picture',
      HTTP_STATUS.UNPROCESSABLE_ENTITY,
      next
    );
  }
  const { bio } = req.body as updateProfileReqBody;
  User.findByIdAndUpdate(
    req.userId,
    { bio: bio, profilePicture: req.file.path },
    {
      new: true
    }
  )
    .then(updatedUser => {
      res.status(HTTP_STATUS.OK).json({
        message: 'Successfully updated user profile',
        user: updateProfile
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not update profile currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};
