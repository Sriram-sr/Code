import { RequestHandler } from 'express';
import { CustomRequest } from '../Types/req-body-types';
import User from '../models/User';
import { errorHandler, HTTP_STATUS } from '../utils/error-handler';

const isAdmin: RequestHandler = (req: CustomRequest, res, next) => {
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
        'Something went wrong, could not process the request currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};

export default isAdmin;
