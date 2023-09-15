const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'signup',
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        console.log('User already exists...');
        return res.redirect('/signup');
      }
      return bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: [] },
          });
          return user.save();
        })
        .then(result => {
          res.redirect('login');
        });
    })
    .catch(err => {
      console.log('Error while checking for existing user ', err);
    });
};

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'login',
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        res.redirect('login');
      }
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          req.session.user = user;
          req.session.isLoggedIn = true;
          return req.session.save(err => {
            if (err) {
              console.log(
                'Error while saving session for current active logged in user ',
                err
              );
            }
            res.redirect('/');
          });
        }
        res.redirect('/login');
      });
    })
    .catch(err => {
      console.log('Error while checking for existing user in login ', err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      console.log('Error while deleting session ', err);
    }
    res.redirect('/login');
  });
};
