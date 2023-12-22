const { validationResult } = require('express-validator');

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

exports.checkFieldsValidation = req => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError('Validation fields are not correct', 422);
    error.data = errors.array();
    throw error;
  }
};
