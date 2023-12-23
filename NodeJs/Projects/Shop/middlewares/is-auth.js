const jwt = require('jsonwebtoken');
const { JWTSECUREKEY } = require('../utils/env-values');
const { errorHandler } = require('../utils/error-handler');

module.exports = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return errorHandler('No token found in cookies', 401, next);
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, JWTSECUREKEY);
  } catch (err) {
    return errorHandler(
      'Something went wrong, could not complete this request',
      500,
      next,
      err
    );
  }
  if (!decodedToken) {
    return errorHandler(
      'User is unauthorised, Invalid token or token may be expired',
      401,
      next
    );
  }
  req.userId = decodedToken.userId;
  next();
};
