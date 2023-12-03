const { validationResult } = require('express-validator');

class HttpError extends Error {
  constructor(message, errorCode) {
    super(message);
    this.statusCode = errorCode;
  }
}

const errorHandler = (message, statusCode, next, err) => {
  if (err) {
    console.log(err);
  }
  const error = new HttpError(message, statusCode);
  next(error);
};

const checkFieldsValidation = req => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError('Validation fields are not correct', 422);
    error.data = errors.array();
    throw error;
  }
};

module.exports = { errorHandler, checkFieldsValidation };
