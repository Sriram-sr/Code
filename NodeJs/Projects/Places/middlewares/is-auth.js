const jwt = require('jsonwebtoken');
const { JWTSECUREKEY } = require('../utils/env-values');
const { errorHandler } = require('../utils/error-handler');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    return errorHandler('User is unauthorised, token not found', 401, next);
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, JWTSECUREKEY);
  } catch (err) {
    return errorHandler('Something went wrong', 500, next, err);
  }
  if (!decodedToken) {
    return errorHandler('User is unauthorised, Invalid token', 401, next);
  }
  req.userId = decodedToken.userId;
  next();
};
