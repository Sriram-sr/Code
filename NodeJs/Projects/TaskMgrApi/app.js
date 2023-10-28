const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/task-routes');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${Date().split('GMT')[0]} ${req.method} ${req.url}`);
  next();
});

app.use('/api/v1/tasks', taskRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    error: 'Route not found',
    message: 'The requested route does not exist.'
  });
});

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  return res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to Mongodb...');
    app.listen(PORT);
  })
  .catch(err => {
    console.log('Error while connecting to Mongodb ', err);
  });
