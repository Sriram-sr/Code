import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { MONGODB_URI, PORT, InternalServerErrorCode } from './utils/env-values';

const app = express();

app.use('/', (_: Request, res: Response, _1: NextFunction) => {
  res.status(InternalServerErrorCode).json({
    message: 'Everything is working fine!'
  });
});

app.use((error: any, _: Request, res: Response, _1: NextFunction): void => {
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
