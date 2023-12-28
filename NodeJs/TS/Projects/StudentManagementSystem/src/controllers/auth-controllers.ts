import { RequestHandler } from 'express';
import { hash } from 'bcryptjs';
import {
  HTTP_STATUS,
  errorHandler,
  checkValidationFields
} from '../utils/error-handler';
import { signupReqBody } from '../Types/req-body-types';
import User from '../models/User';


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
    
}
