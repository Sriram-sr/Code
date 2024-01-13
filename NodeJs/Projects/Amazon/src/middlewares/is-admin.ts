import { RequestHandler } from 'express';
import { customRequest } from '../types/common-types';
import { errorHandler, HTTP_STATUS } from '../utils/error-handler';
import User from '../models/User';

export const isAdmin: RequestHandler = (req: customRequest, _, next) => {
  User.findById(req.userId)
    .then(user => {
      if (user && user.role !== 'admin') {
        return errorHandler(
          'Only admin can access this route',
          HTTP_STATUS.FORBIDDEN,
          next
        );
      }
      next();
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not complete this request currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};
