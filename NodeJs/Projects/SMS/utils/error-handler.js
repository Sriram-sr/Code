const { validationResult } = require('express-validator');

exports.errorHandler = (err, next) => {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
  next(err);
};

exports.checkFieldsValidation = req => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation fields are not correct');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
};
