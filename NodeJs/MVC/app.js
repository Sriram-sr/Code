const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const paths = require('./utils/path');
const errorController = require('./controllers/error');
const authRoutes = require('./routes/auth-routes');
const adminRoutes = require('./routes/admin-routes');
const shopRoutes = require('./routes/shop-routes');
const User = require('./models/user');

const MONGODB_URI =
  'mongodb+srv://sriram:sriram@nodejsmongo.wug3keq.mongodb.net/shop?retryWrites=true&w=majority';

const app = express();

const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions',
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(paths.staticDir));
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store,
    // cookie: {
    //   maxAge: 100000
    // }
  })
);
const csrfProtection = csrf();
app.use(csrfProtection);
app.use(flash());

app.use(async (req, res, next) => {
  console.log(`${Date().split('GMT')[0]} ${req.method} ${req.url}`);

  try {
    if (!req.session.user) {
      // To allow logged out users to continue with the application
      return next();
    }

    const user = await User.findById(req.session.user._id);
    req.user = user;
    next();
  } catch (err) {
    console.log('Error while finding user with session ', err);
    next(err);
  }
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use(authRoutes);
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to mongodb');
    app.listen(3000);
  })
  .catch(err => {
    console.log('Error while connecting mongodb ', err);
  });
