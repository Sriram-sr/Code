import { RequestHandler } from 'express';
import { hash, compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
  checkValidationFields,
  HTTP_STATUS,
  errorHandler
} from '../utils/error-handler';
import {
  JWT_SECURE_KEY,
  JWT_EXPIRES_IN,
  COOKIE_EXPIRY_DAYS
} from '../utils/env-values';
import { signupReqBody } from '../Types/req-body';
import User from '../models/User';

// @route   POST api/v1/auth/signup
// @desc    Registers new user
// @access  Public
export const signupUser: RequestHandler = (req, res, next) => {
  checkValidationFields(req);
  const { email, password, userName } = req.body as signupReqBody;

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
        .then(hashedPassword => {
          return User.create({
            email,
            password: hashedPassword,
            userName
          });
        })
        .then(newUser => {
          const { password, ...customUser } = newUser.toObject();
          res.status(HTTP_STATUS.CREATED).json({
            message: 'Sucessfully registered user',
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

// @route   POST api/v1/auth/signin
// @desc    Logs in user
// @access  Public
export const signinUser: RequestHandler = (req, res, next) => {
  checkValidationFields(req);
  type cookieOptionsType = {
    expires: Date;
    httpOnly: boolean;
  };
  const { userName, email, password } = req.body as signupReqBody;
  const serverErrorStr = 'Something went wrong, could not signin currently';

  User.findOne({ $or: [{ email: email }, { userName: userName }] })
    .then(user => {
      if (!user) {
        return errorHandler(
          'User not found with this email/username',
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
            const { password, ...customUser } = user.toObject();
            res
              .cookie('token', token, cookieOptions)
              .status(HTTP_STATUS.OK)
              .json({
                message: 'Successfully logged in user',
                user: customUser,
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
