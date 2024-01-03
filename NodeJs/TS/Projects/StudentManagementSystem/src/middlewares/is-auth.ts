import { RequestHandler } from 'express';
import { verify } from 'jsonwebtoken';
import { cookieBody, CustomRequest } from '../Types/req-body-types';
import { JWT_SECURE_KEY } from '../utils/env-values';
import { errorHandler, HTTP_STATUS } from '../utils/error-handler';

const isAuth: RequestHandler = (req: CustomRequest, res, next) => {
  const { token } = req.cookies as cookieBody;
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
      'Something went wrong, could not process the request currently',
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      next,
      err
    );
  }
  if (!decodedToken) {
    return errorHandler(
      'Invalid token or may be expired',
      HTTP_STATUS.UNAUTHORIZED,
      next
    );
  }
  req.userId = decodedToken.userId;
  console.log('ID is ' + req.userId);
  next();
};

export default isAuth;
