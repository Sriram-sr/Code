import { RequestHandler } from 'express';
import { checkValidationFields } from '../utils/error-handler';

export const signupUser: RequestHandler = (req, res, next) => {
  checkValidationFields(req);
  res.status(200).json({
    message: 'Cool, validations are fine for closure'
  });
};
