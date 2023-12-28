const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const {
  MONGODB_URI,
  PORT,
  InternalServerErrorCode
} = require('./utils/env-values');
const authRoutes = require('./routes/auth-routes');
const adminRoutes = require('./routes/admin-routes');
const teacherRoutes = require('./routes/teacher-routes');
const studentRoutes = require('./routes/student-routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use('/api/v1/user', authRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/teacher', teacherRoutes);
app.use('/api/v1/student', studentRoutes);

app.use((error, req, res, next) => {
  // console.log(error);
  const statusCode = error.statusCode || InternalServerErrorCode;
  res.status(statusCode).json({ message: error.message, data: error.data });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to Mongodb');
    app.listen(PORT);
  })
  .catch(err => {
    console.log('Error while connecting to db ', err);
  });
