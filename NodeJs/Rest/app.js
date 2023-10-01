const express = require('express');
const bodyParser = require('body-parser');
const feedRoutes = require('./routes/feed-routes');
const mongoose = require('mongoose');

const MONGODB_URI =
  'mongodb+srv://sriram:sriram@nodejsmongo.wug3keq.mongodb.net/shop?retryWrites=true&w=majority';


const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/feed', feedRoutes);

mongoose.connect(MONGODB_URI).then(result => {
    console.log('Connected to Mongodb');
    app.listen(8000);
}).catch(err => {
    console.log('Error while connecting to db ', err);
})

