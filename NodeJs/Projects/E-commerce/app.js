const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const { MONGODB_URI, PORT } = require('./utils/env-values');
const productRoutes = require('./routes/product-routes');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/product', productRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({
    message,
    data
  });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to mongodb...');
    app.listen(PORT);
  })
  .catch(err => {
    console.log('Error while connecting to mongodb', err);
  });
