import { NextFunction } from 'express';

export class HttpError extends Error {
  statusCode: number;
  
  constructor(message: string, errorCode: number) {
    super(message);
    this.statusCode = errorCode;
  }
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

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
};
