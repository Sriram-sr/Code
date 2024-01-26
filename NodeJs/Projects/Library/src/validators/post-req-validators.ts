import { ValidationChain, body } from 'express-validator';
import { bookGenres } from '../models/Book';

export const createMemberValidator: ValidationChain[] = [
  body('memberName')
    .notEmpty()
    .withMessage('Member name is required')
    .isLength({ min: 6, max: 15 })
    .withMessage('Member name should be within 6 to 15 characters')
    .matches(/^[a-zA-Z]+$/g)
    .withMessage('Member name should contain only letters and not integers'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Enter a valid email')
    .normalizeEmail(),
  body('street')
    .notEmpty()
    .withMessage('Street is required for address')
    .isLength({ max: 100 })
    .withMessage('Street value should not exceed 100 characters'),
  body('city').notEmpty().withMessage('City is required for address'),
  body('state').notEmpty().withMessage('State is required for address'),
  body('zip')
    .notEmpty()
    .withMessage('Zip code is required for address')
    .isInt()
    .withMessage('Zip code should be integer'),
  body('country').notEmpty().withMessage('Country is required for address'),
  body('mobile')
    .isMobilePhone('any', { strictMode: false })
    .withMessage('Enter a valid mobile number')
];

export const createBookValidator: ValidationChain[] = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 50 })
    .withMessage('Title should not exceed 50 characters')
    .trim(),
  body('author')
    .notEmpty()
    .withMessage('Author is required')
    .isLength({ max: 15 })
    .withMessage('Author should not exceed 15 characters'),
  body('genre')
    .notEmpty()
    .withMessage('Genre is required')
    .isIn(bookGenres)
    .withMessage('Enter a valid genre'),
  body('isbnNumber')
    .notEmpty()
    .withMessage('Isbn number is required')
    .isInt()
    .withMessage('Isbn number should be number')
    .isLength({ min: 4, max: 4 })
    .withMessage('Isbn number should be exactly 4 in length')
];
