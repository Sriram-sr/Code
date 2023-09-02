const express = require('express');
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin-routes');
const shopRoutes = require('./routes/shop-routes');
const utilPaths = require('./utils/path');
const errorController = require('./controllers/error');
const mongoose = require('mongoose');
const User = require('./models/user');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(utilPaths.staticDir));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use((req, res, next) => {
  User.findById('64f33fcc9b88f560c724c59f').then(user => {
    req.user = user;
    next();
  }).catch(err => {
    console.log('Cannot find the user to initialize with request ', err);
  });
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    'mongodb+srv://sriram:sriram@nodejsmongo.wug3keq.mongodb.net/nodejslearn?retryWrites=true&w=majority'
  )
  .then(result => {
    User.findOne()
      .then(user => {
        if (!user) {
          const newUser = new User({
            name: 'Sriram',
            email: 'sriram@test.com',
            cart: {
              items: []
            },
          });
          newUser.save();
          console.log('User created');
        }
      })
      .catch(err => {
        console.log('Error while creating initial user ', err);
      });
    app.listen(3000);
    console.log('Connected to MongoDB....');
  })
  .catch(err => {
    console.log('Error while connecting to DB ', err);
  });
