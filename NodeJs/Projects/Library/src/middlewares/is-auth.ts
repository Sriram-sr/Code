import { Request, RequestHandler } from 'express';
import { verify } from 'jsonwebtoken';
import { errorHandler, HTTP_STATUS } from '../utils/error-handlers';
import { JWT_SECURE_KEY } from '../utils/env-values';

export interface customRequestBody extends Request {
  userId?: string;
  email?: string;
}

const isAuth: RequestHandler = (req: customRequestBody, _, next) => {
  const [bearer, token] = req.headers.authorization?.split(' ') ?? [];
  if (bearer !== 'Bearer' || !token) {
    return errorHandler(
      'Invalid Authorization header format',
      HTTP_STATUS.UNAUTHORIZED,
      next
    );
  }
  let decodedToken;
  try {
    decodedToken = verify(token, JWT_SECURE_KEY) as {
      email: string;
      userId: string;
    };
  } catch (err) {
    return errorHandler(
      'Something went wrong, could not complete this request currently',
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
  req.email = decodedToken.email;
  next();
};

export default isAuth;
