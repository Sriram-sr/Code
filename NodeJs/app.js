const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const paths = require('./utils/path');
const errorController = require('./controllers/error');
const adminRoutes = require('./routes/admin-routes');
const shopRoutes = require('./routes/shop-routes');
const User = require('./models/user');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(paths.staticDir));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use((req, res, next) => {
    User.findById('650eeb54588253b10aec446e').then(user => {
        req.user = user;
        next();
    }).catch(err => {
        console.log('Error while finding user ', err);
    });
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);

mongoose.connect('mongodb+srv://sriram:sriram@nodejsmongo.wug3keq.mongodb.net/shop?retryWrites=true&w=majority').then(result => {
    console.log('Connected to mongodb');
    User.findOne().then(user => {
        if(!user) {
            const user = new User({
                username: 'Sriram',
                email: 'test@test.com',
                cart: {
                    items: []
                }
            });
            user.save();
        }
    }).catch(err => {
        console.log('Error while checking for existing users ', err);
    })
    app.listen(8000);
}).catch(err => {
    console.log('Error while connecting mongodb ', err);
});