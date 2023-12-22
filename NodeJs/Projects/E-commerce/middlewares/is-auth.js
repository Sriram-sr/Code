const jwt = require("jsonwebtoken");
const { JWTSECUREKEY } = require("../utils/env-values");
const { errorHandler } = require("../utils/error-handler");
const User = require("../models/User");

exports.isAuth = (req, res, next) => {
  // token from cookie authentication
  const token = req.cookies.token;
  if (!token) {
    return errorHandler("No token found in cookies", 401, next);
  }
  try {
    decodedToken = jwt.verify(token, JWTSECUREKEY);
  } catch (err) {
    return errorHandler("Something went wrong", 500, next, err);
  }
  if (!decodedToken) {
    return errorHandler("User is unauthorised, Invalid token", 401, next);
  }
  req.userId = decodedToken.userId;
  next();
};

exports.isAdmin = (req, res, next) => {
  User.findById(req.userId)
    .then((user) => {
      if (user.role !== "admin") {
        return errorHandler("Only admin can access this route", 403, next);
      }
      next();
    })
    .catch((err) => {
      errorHandler(
        "Something went wrong, could not access the route currently",
        500,
        next,
        err
      );
    });
};
