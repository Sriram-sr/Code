const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const { MONGODB_URI, PORT } = require('./utils/env-values');
const HttpError = require('./models/http-error');
const authRoutes = require('./routes/auth-routes');
const placeRoutes = require('./routes/places-routes');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/places', placeRoutes);

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  // console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  return res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to mongodb...');
    app.listen(PORT);
  })
  .catch(err => {
    console.log('Error while connecting to Mongodb ', err);
  });
