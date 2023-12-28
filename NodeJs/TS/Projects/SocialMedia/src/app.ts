import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import logger from 'morgan';
import { MONGODB_URI, PORT } from './utils/env-values';
import postRoutes from './routes/post-routes';

const app = express();

app.use(logger('dev'));

app.use('/api/v1/post', postRoutes);

app.use(
  (error: any, req: Request, res: Response, next: NextFunction): void => {
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
      message: error.message,
      data: error.data
    });
  }
);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to mongodb...');
    app.listen(PORT);
  })
  .catch(err => {
    console.log('Error while connecting to mongodb ', err);
  });
