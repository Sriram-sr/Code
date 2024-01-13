import { RequestHandler } from 'express';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import {
  checkValidationFields,
  errorHandler,
  HTTP_STATUS
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
  const { firstName, lastName, email, mobile, password } =
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
        password
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
