import { RequestHandler } from 'express';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import {
  checkValidationFields,
  errorHandler,
  HTTP_STATUS,
  validateObjectId
} from '../utils/error-handler';
import { signupReqBody, signinReqBody } from '../types/req-body-types';
import { cookieOptionsType } from '../types/common-types';
import {
  JWT_SECURE_KEY,
  JWT_EXPIRES_IN,
  COOKIE_EXPIRY_DAYS
} from '../utils/env-values';
import User from '../models/User';

// @route   POST api/v1/auth/signup/
// @desc    Registers a user
// @access  Public
export const signupUser: RequestHandler = (req, res, next) => {
  checkValidationFields(req);
  const { firstName, lastName, email, mobile, password, role } =
    req.body as signupReqBody;
  User.findOne({ email: email })
    .then(existingUser => {
      if (existingUser) {
        return errorHandler(
          'User with this email exists already',
          HTTP_STATUS.CONFLICT,
          next
        );
      }
      User.create({
        firstName,
        lastName,
        email,
        mobile,
        password,
        role
      })
        .then(user => {
          const { password, ...customUser } = user.toObject();
          res.status(HTTP_STATUS.CREATED).json({
            message: 'Successfully registered user',
            user: customUser
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

// @route   POST api/v1/auth/signin/
// @desc    Logins a user
// @access  Public
export const signinUser: RequestHandler = (req, res, next) => {
  checkValidationFields(req);
  const serverErrorStr = 'Something went wrong, could not signin currently';
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
            token = sign(
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
      errorHandler(
        'Something went wrong, could not signin currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};

// @route   GET api/v1/auth/users/
// @desc    Gets all users
// @access  Private(Admin)
export const getAllUsers: RequestHandler = (req, res, next) => {
  const currentPage = (req.query as { page: string }).page || 1;
  const perPage = 2;
  User.find()
    .skip((+currentPage - 1) * perPage)
    .limit(perPage)
    .then(users => {
      res.status(HTTP_STATUS.OK).json({
        message: 'Successfully fetched all users',
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

// @route   GET api/v1/auth/users/userId
// @desc    Gets single user
// @access  Private(Admin)
export const getSingleUser: RequestHandler = (req, res, next) => {
  const userId = (req.params as { userId: string }).userId;
  validateObjectId(userId);

  User.findById(userId)
    .then(user => {
      if (!user) {
        return errorHandler(
          'No user found with this id',
          HTTP_STATUS.NOT_FOUND,
          next
        );
      }
      res.status(HTTP_STATUS.OK).json({
        message: 'Successfully fetched user',
        user
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not get user currently',
        HTTP_STATUS.NOT_FOUND,
        next,
        err
      )
    );
};

// @route   PATCH api/v1/auth/users/userId
// @desc    Updates a user
// @access  Private(Admin)
export const updateUser: RequestHandler = (req, res, next) => {
  checkValidationFields(req);
  const userId = (req.params as { userId: string }).userId;
  validateObjectId(userId);
  const { firstName, lastName, mobile } = req.body as signupReqBody;

  User.findById(userId)
    .then(user => {
      if (!user) {
        return errorHandler(
          'No user found with this id',
          HTTP_STATUS.NOT_FOUND,
          next
        );
      }

      user.firstName = firstName;
      user.lastName = lastName;
      user.mobile = mobile;
      user
        .save()
        .then(updatedUser => {
          res.status(HTTP_STATUS.OK).json({
            message: 'Successfully updated user',
            updatedUser
          });
        })
        .catch(err =>
          errorHandler(
            'Something went wrong, could not get user currently',
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            next,
            err
          )
        );
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not get user currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};

// @route   DELETE api/v1/auth/users/userId
// @desc    Deletes a user
// @access  Private(Admin)
export const deleteUser: RequestHandler = (req, res, next) => {
  const userId = (req.params as { userId: string }).userId;
  validateObjectId(userId);

  User.findById(userId)
    .then(user => {
      if (!user) {
        return errorHandler(
          'No user found with this id',
          HTTP_STATUS.INTERNAL_SERVER_ERROR,
          next
        );
      }
      user
        .deleteOne()
        .then(() => {
          res.status(HTTP_STATUS.OK).json({
            message: 'Successfully deleted user'
          });
        })
        .catch(err =>
          errorHandler(
            'Something went wrong, could not get user currently',
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            next,
            err
          )
        );
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not get user currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};
