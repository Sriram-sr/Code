const express = require('express');
const mongoose = require('mongoose');
const { MONGODB_URI, PORT } = require('./utils/env-values');

const app = express();

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to mongodb...');
    app.listen(PORT);
  })
  .catch(err => {
    console.log('Error while connecting to Mongodb ', err);
  });