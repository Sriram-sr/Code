import { RequestHandler } from 'express';
import { hash, compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
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
  signinReqBody,
  signupReqBody
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