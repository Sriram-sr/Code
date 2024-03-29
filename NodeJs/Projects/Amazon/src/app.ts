import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { MONGODB_URI, PORT, InternalServerErrorCode } from './utils/env-values';
import authRoutes from './routes/auth-routes';
import productRoutes from './routes/product-routes';

const app = express();

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/product', productRoutes);

app.use((error: any, _: Request, res: Response, _1: NextFunction) => {
  const statusCode = error.statusCode || InternalServerErrorCode;
  res.status(statusCode).json({
    message: error.message,
    data: error.data
  });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to Mongodb...');
    app.listen(PORT);
  })
  .catch(err => {
    console.log('Error while connecting to mongodb ', err);
  });
