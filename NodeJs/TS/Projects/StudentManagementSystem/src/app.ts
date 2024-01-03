import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { MONGODB_URI, PORT, InternalServerErrorCode } from './utils/env-values';
import authRoutes from './routes/auth-routes';
import adminRoutes from './routes/admin-routes';
import teacherRoutes from './routes/teacher-routes';
import studentRoutes from './routes/student-routes';

const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/teacher', teacherRoutes);
app.use('/api/v1/student', studentRoutes);

app.use((error: any, req: Request, res: Response, next: NextFunction): void => {
  // console.log(error);
  const statusCode = error.statusCode || InternalServerErrorCode;
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
