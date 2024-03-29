import { Request, NextFunction } from 'express';
import { validationResult } from 'express-validator';

class HttpError extends Error {
  statusCode: number;
  data: object = {};

  constructor(message: string, errorCode: number) {
    super(message);
    this.statusCode = errorCode;
  }
}

export enum HTTP_STATUS {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503
}

export const errorHandler = (
  message: string,
  statusCode: number,
  next: NextFunction,
  err: any = null
) => {
  if (err) {
    console.log(err);
  }
  const error = new HttpError(message, statusCode);
  next(error);
};

export const checkValidationError = (req: Request) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError(
      'Input validation error',
      HTTP_STATUS.UNPROCESSABLE_ENTITY
    );
    error.data = errors.array();
    throw error;
  }
};
