const bcrypt = require('bcryptjs');
const User = require('../models/user');
const crypto = require('crypto');
const { validationResult } = require('express-validator');

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
    errorMessage: getErrorMessage(req),
  });
};

exports.getReset = (req, res, next) => {
  res.render('auth/reset', {
    pageTitle: 'Reset',
    path: '/reset',
    errorMessage: getErrorMessage(req),
  });
};

exports.getRegister = (req, res, next) => {
  res.render('auth/register', {
    pageTitle: 'Register',
    path: '/register',
    errorMessage: getErrorMessage(req),
  });
};

exports.getNewPassword = async (req, res, next) => {
  try {
    const token = req.params.token;
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      req.flash('error', 'No user with token Found');
      return res.redirect('/login');
    }
    res.render('auth/new-password', {
      errorMessage: getErrorMessage(req),
      userId: user._id.toString(),
      pageTitle: 'New Password',
      path: '/new-password',
    });
  } catch (err) {
    console.log('Error while finding user with reset token ', err);
  }
};

exports.postRegister = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render('auth/register', {
      pageTitle: 'Register',
      path: '/register',
      errorMessage: errors.array()[0].msg,
    });
  }
  return bcrypt
    .hash(password, 2)
    .then(hashedPassword => {
      const user = new User({
        email: email,
        password: hashedPassword,
        cart: {
          items: [],
        },
      });
      return user.save();
    })
    .then(() => {
      req.flash('error', 'User registered successfully');
      res.redirect('/login');
    })
    .catch(err => {
      console.log('Error while saving new user ', err);
    });
};

exports.postLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render('auth/login', {
      pageTitle: 'Login',
      path: '/login',
      errorMessage: errors.array()[0].msg,
    });
  }
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      req.flash('error', 'Invalid Username/Password');
      return res.redirect('/login');
    }
    try {
      const isMatch = await bcrypt.compare(password, user.password);
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
        req.flash('error', 'Invalid Password');
        return res.redirect('/login');
      }
    } catch (err) {
      console.log('Error while comparing passwords ', err);
    }
  } catch (err) {
    console.log('Error while finding user for login ', err);
  }
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      console.log('Error while trying to delete session ', err);
    }
    res.redirect('/');
  });
};

exports.postReset = (req, res, next) => {
  const email = req.body.email;
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect('/reset');
    }
    const token = buffer.toString('hex');
    User.findOne({ email: email })
      .then(user => {
        if (!user) {
          req.flash('error', 'No active account with email found.');
          return res.redirect('/reset');
        }
        user.resetToken = token;
        user.resetTokenExpiry = Date.now() + 360000;
        user.save();
        // req.flash('error', 'Reset token sent to your mail');
        return res.render('auth/mail', {
          token: token,
          pageTitle: 'Mail',
          path: '/mail',
        });
      })
      .catch(err => {
        console.log('Error while checking for existing user for reset ', err);
      });
  });
};

exports.postNewPassword = (req, res, next) => {
  const password = req.body.password;
  const userId = req.body.userId;
  User.findById(userId)
    .then(user => {
      bcrypt
        .hash(password, 2)
        .then(hashedPassword => {
          user.password = hashedPassword;
          user.resetToken = undefined;
          user.resetTokenExpiry = undefined;
          return user.save();
        })
        .then(() => {
          return res.redirect('/login');
        })
        .catch(err => {
          console.log('Error while updating password ', err);
        });
    })
    .catch(err => {
      console.log('Error while checking for user for updating password ', err);
    });
};
