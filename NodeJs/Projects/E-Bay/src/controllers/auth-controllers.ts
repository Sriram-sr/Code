import { RequestHandler } from 'express';
import { checkValidationError, HTTP_STATUS } from '../utils/error-handlers';

// @route   POST /api/v1/auth/signup/
// @desc    Registers user
// @acess   Public
export const signupUser: RequestHandler = (req, res, _) => {
  checkValidationError(req);

  res.status(HTTP_STATUS.CREATED).json({
    message: 'Validation fields are sucessful and a very long way to go...'
  });
};
