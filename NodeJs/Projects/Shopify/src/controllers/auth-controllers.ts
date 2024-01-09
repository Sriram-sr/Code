import { RequestHandler } from 'express';
import { hash } from 'bcryptjs';
import {
  HTTP_STATUS,
  errorHandler,
  checkValidationFields
} from '../utils/error-handler';
import { signupReqBody } from '../types/req-body-types';
import User from '../models/User';

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
