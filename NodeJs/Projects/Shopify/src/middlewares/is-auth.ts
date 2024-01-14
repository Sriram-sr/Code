import { RequestHandler } from 'express';
import { verify } from 'jsonwebtoken';
import { customRequest } from '../types/custom-types';
import { errorHandler, HTTP_STATUS } from '../utils/error-handler';
import { JWT_SECURE_KEY } from '../utils/env-values';

const isAuthenticated: RequestHandler = (req: customRequest, _, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return errorHandler(
      'No authorization token found',
      HTTP_STATUS.UNAUTHORIZED,
      next
    );
  }
  try {
    const decodedToken = verify(token, JWT_SECURE_KEY) as {
      userId: string;
      email: string;
    };
    if (!decodedToken) {
      return errorHandler(
        'Invalid token or token may be expired',
        HTTP_STATUS.UNAUTHORIZED,
        next
      );
    }
    req.userId = decodedToken.userId;
    req.email = decodedToken.email;
    next();
  } catch (err) {
    return errorHandler(
      'Something went wrong, could not complete this request currently',
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      next,
      err
    );
  }
};

export default isAuthenticated;
