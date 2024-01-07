import { RequestHandler } from 'express';
import { hash } from 'bcryptjs';
import {
  checkValidationFields,
  HTTP_STATUS,
  errorHandler
} from '../utils/error-handler';
import { signupReqBody } from '../Types/req-body';
import User from '../models/User';

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
