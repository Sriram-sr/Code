import { RequestHandler } from 'express';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import {
  checkValidationError,
  HTTP_STATUS,
  errorHandler
} from '../utils/error-handlers';
import User, { UserProto } from '../models/User';
import { JWT_SECURE_KEY, JWT_EXPIRES_IN } from '../utils/env-values';

// @route   POST /api/v1/auth/signup/
// @desc    Registers user
// @acess   Public
export const signupUser: RequestHandler = (req, res, next) => {
  checkValidationError(req);
  const serverErrorMsg = 'Something went wrong, could not signup currently';
  const { username, email, password, role } = req.body as UserProto;
      
  User.findOne({ email: email })
    .then(existingUser => {
      if (existingUser) {
        return errorHandler(
          'User with this email exists already',
          HTTP_STATUS.CONFLICT,
          next
        );
      }
      hash(password, 2)
        .then(hashedPassword => {
          return User.create({
            username,
            email,
            password: hashedPassword,
            role
          });
        })
        .then(newUser => {
          res.status(HTTP_STATUS.CREATED).json({
            message: 'Sucessfully registered user',
            newUser
          });
        })
        .catch(err =>
          errorHandler(
            serverErrorMsg,
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            next,
            err
          )
        );
    })
    .catch(err =>
      errorHandler(serverErrorMsg, HTTP_STATUS.INTERNAL_SERVER_ERROR, next, err)
    );
};

// @route   POST /api/v1/auth/signin/
// @desc    Logins user
// @acess   Public
export const signinUser: RequestHandler = (req, res, next) => {
  checkValidationError(req);
  const serverErrorMsg = 'Something went wrong, could not signin currently';
  const { email, username, password } = req.body as {
    email?: string;
    username?: string;
    password: string;
  };

  User.findOne({ $or: [{ email: email }, { username: username }] })
    .then(user => {
      if (!user) {
        return errorHandler(
          'No user with email/username is found',
          HTTP_STATUS.UNAUTHORIZED,
          next
        );
      }
      compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) {
            return errorHandler(
              'Invalid username or password',
              HTTP_STATUS.UNAUTHORIZED,
              next
            );
          }
          try {
            const token = sign(
              { email: user.email, _id: user._id.toString() },
              JWT_SECURE_KEY,
              { expiresIn: JWT_EXPIRES_IN }
            );
            res.status(HTTP_STATUS.OK).json({
              message: 'Successfully logged in user',
              token,
              user
            });
          } catch (err) {
            return errorHandler(
              serverErrorMsg,
              HTTP_STATUS.INTERNAL_SERVER_ERROR,
              next,
              err
            );
          }
        })
        .catch(err =>
          errorHandler(
            serverErrorMsg,
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            next,
            err
          )
        );
    })
    .catch(err =>
      errorHandler(serverErrorMsg, HTTP_STATUS.INTERNAL_SERVER_ERROR, next, err)
    );
};
