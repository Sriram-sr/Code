const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const { MONGODB_URI, PORT } = require('./utils/env-values');
const userRoutes = require('./routes/user-routes');
const profileRoutes = require('./routes/profile-routes');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/profile', profileRoutes);

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
