const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDbStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const adminRoutes = require('./routes/admin-routes');
const shopRoutes = require('./routes/shop-routes');
const authRoutes = require('./routes/auth-routes');
const utilPaths = require('./utils/path');
const errorController = require('./controllers/error');
const User = require('./models/user');

const MONGODB_URI =
  'mongodb+srv://sriram:sriram@nodejsmongo.wug3keq.mongodb.net/nodejslearn?retryWrites=true&w=majority';

const app = express();
const store = new MongoDbStore({
  uri: MONGODB_URI,
  collection: 'sessions',
});
const csrfProtection = csrf();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(utilPaths.staticDir));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);
app.use(csrfProtection);

app.use((req, res, next) => {
  if (!req.session.user) {
    console.log('No user found from the session');
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => {
      console.log('Error while finding user with user id ', err);
    });
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
})

app.use(authRoutes);
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI)
  .then(result => {
    app.listen(3000);
    console.log('Connected to MongoDB....');
  })
  .catch(err => {
    console.log('Error while connecting to DB ', err);
  });
