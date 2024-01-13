import { RequestHandler } from 'express';
import { verify } from 'jsonwebtoken';
import { errorHandler, HTTP_STATUS } from '../utils/error-handler';
import { JWT_SECURE_KEY } from '../utils/env-values';
import { customRequest } from '../types/common-types';

export const isAuthenticated: RequestHandler = (
  req: customRequest,
  _,
  next
) => {
  const { token } = req.cookies as { token: string };
  if (!token) {
    return errorHandler(
      'Token not found in the request header',
      HTTP_STATUS.UNAUTHORIZED,
      next
    );
  }
  let decodedToken: any;
  try {
    decodedToken = verify(token, JWT_SECURE_KEY);
  } catch (err) {
    return errorHandler(
      'Something went wrong, could not complete the request currently',
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      next,
      err
    );
  }
  if (!decodedToken) {
    return errorHandler(
      'Invalid token or token may be expired',
      HTTP_STATUS.UNAUTHORIZED,
      next
    );
  }
  req.userId = decodedToken.userId;
  next();
};
