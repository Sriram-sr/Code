const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { MONGODB_URI, PORT } = require('./utils/env-values');
const authRoutes = require('./routes/auth-routes');
const shopRoutes = require('./routes/shop-routes');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger('dev'));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/shop', shopRoutes);

app.use((error, req, res, next) => {
  // console.log(error);
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({
    message: error.message,
    data: error.data
  });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to mongodb...');
    app.listen(PORT);
  })
  .catch(err => {
    console.log('Error while connecting to mongodb ', err);
  });
