const jwt = require('jsonwebtoken');
const { JWTSECUREKEY } = require('../utils/env-values');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  let error;
  if (!authHeader) {
    error = new Error('User is unauthorised');
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, JWTSECUREKEY);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodedToken) {
    error = new Error('Not Authenticated. Invalid token');
    throw error;
  }
  req.userId = decodedToken.userId;
  next();
};
