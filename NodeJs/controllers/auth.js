const bcrypt = require('bcryptjs');
const User = require('../models/user');

const getErrorMessage = req => {
  let errorMessage = req.flash('error');
  if (errorMessage.length > 0) {
    return errorMessage[0];
  }
  return null;
};

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    pageTitle: 'Login',
    path: '/login',
    errorMessage: getErrorMessage(req)
  });
};

exports.getRegister = (req, res, next) => {
  res.render('auth/register', {
    pageTitle: 'Register',
    path: '/register',
    errorMessage: getErrorMessage(req)
  });
};

exports.postRegister = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        req.flash('error', 'User already exists');
        return res.redirect('/register');
      }
      return bcrypt
        .hash(password, 2)
        .then(hashedPassword => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: {
              items: []
            }
          });
          return user.save();
        })
        .then(result => {
          req.flash('error', 'User registered successfully');
          res.redirect('/login');
        })
        .catch(err => {
          console.log('Error while saving new user ', err);
        });
    })
    .catch(err => {
      console.log('Error while checking for existing user ', err);
    });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        req.flash('error', 'Invalid Username/Password');
        return res.redirect('/login');
      }
      bcrypt
        .compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            req.session.save(err => {
              if (err) {
                console.log('Error while saving session after login ', err);
              }
              return res.redirect('/');
            });
          } else {
            return res.redirect('/login');
          }
        })
        .catch(err => {
          console.log('Error while comparing passwords ', err);
        });
    })
    .catch(err => {
      console.log('Error while finding user for login ', err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      console.log('Error while trying to delete session ', err);
    }
    res.redirect('/');
  });
};
