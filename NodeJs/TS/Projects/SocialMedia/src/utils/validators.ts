import { body, ValidationChain } from 'express-validator';
import User from '../models/User';

export const signupUserRules: ValidationChain[] = [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6, max: 15 })
    .withMessage('Password should be within 6-15 characters'),
  body('userName')
    .trim()
    .notEmpty()
    .withMessage('userName is required')
    .isLength({ min: 6, max: 15 })
    .withMessage('Password should be within 6-15 characters')
    .custom(async (value: string) => {
      let existingUser;
      try {
        existingUser = await User.findOne({ userName: value });
      } catch (err) {
        throw new Error(
          'Something went wrong, could not proceed with this request'
        );
      }
      if (existingUser) {
        throw new Error('Username is taken, choose a different one');
      }
    })
];
