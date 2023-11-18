const brcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWTSECUREKEY } = require('../utils/env-values');
const {
  errorHandler,
  checkFieldsValidation
} = require('../utils/error-handler');
const User = require('../models/user');

const signupUser = (req, res, next) => {
  checkFieldsValidation(req);
  const { email, password } = req.body;
  brcrypt
    .hash(password, 2)
    .then(hashedPassword => {
      const user = new User({
        email: email,
        password: hashedPassword,
        image: 'https://picsum.photos/200/300',
        places: []
      });
      return user.save();
    })
    .then(createdUser => {
      res.status(201).json({
        message: 'User registered successfully',
        user: createdUser
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not able to signup',
        500,
        next,
        err
      )
    );
};

const loginUser = (req, res, next) => {
  checkFieldsValidation(req);
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        return errorHandler(
          'Could not find the user with this email',
          404,
          next
        );
      }
      brcrypt
        .compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) {
            return errorHandler(
              'Invalid password, please enter a valid one',
              422,
              next
            );
          }
          const token = jwt.sign(
            { email: email, userId: user._id.toString() },
            JWTSECUREKEY,
            { expiresIn: '1h' }
          );
          res.status(200).json({
            token: token,
            user: user
          });
        })
        .catch(err =>
          errorHandler(
            'Something went wrong, could not able to signin',
            500,
            next,
            err
          )
        );
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not able to signin',
        500,
        next,
        err
      )
    );
};

module.exports = {
  signupUser,
  loginUser
};
