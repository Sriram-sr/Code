const errorHandler = require('./error-handler');

const asyncWrapper = fn => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      errorHandler(err, next);
    }
  };
};

module.exports = asyncWrapper;
