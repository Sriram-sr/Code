class HttpError extends Error {
  constructor(message, errorCode) {
    super(message);
    this.statusCode = errorCode;
  }
}

exports.HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
};

exports.errorHandler = (message, statusCode, next, err) => {
  if (err) {
    console.log(err);
  }
  const error = new HttpError(message, statusCode);
  next(error);
};
