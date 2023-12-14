class HttpError extends Error {
  constructor(message, errorCode) {
    super(message);
    this.statusCode = errorCode;
  }
}

exports.errorHandler = (message, statusCode, next, err) => {
  if (err) {
    console.log(err);
  }
  const error = new HttpError(message, statusCode);
  next(error);
};