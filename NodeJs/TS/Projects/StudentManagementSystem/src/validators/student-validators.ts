import { body, ValidationChain } from 'express-validator';

export const createStudentRules: ValidationChain[] = [
  body('name')
    .notEmpty()
    .withMessage('Name should not be empty')
    .isAlpha()
    .withMessage('Name should contain only letters')
    .isLength({ min: 6, max: 30 })
    .withMessage('Name should contain atleast 6-30 characters'),
  body('age')
    .notEmpty()
    .withMessage('Age is a required field')
    .isInt()
    .withMessage('Age should be a integer value'),
  body('gender')
    .notEmpty()
    .withMessage('Gender is a required field')
    .isIn(['male', 'female', 'other'])
    .withMessage('Invalid gender'),
  body('email')
    .notEmpty()
    .withMessage('Email is a required field')
    .isEmail()
    .withMessage('Please provide a valid email address'),
  body('phone')
    .notEmpty()
    .withMessage('Phone number is a required field')
    .isMobilePhone('any')
    .withMessage('Invalid mobile number'),
  body('nationality')
    .optional()
    .isString()
    .withMessage('Nationality must be a string'),
  body('street').optional().notEmpty().withMessage('Street is required'),
  body('city').optional().notEmpty().withMessage('City is required'),
  body('state').optional().notEmpty().withMessage('State is required'),
  body('zip').optional().isPostalCode('any').withMessage('Invalid ZIP code')
];
