import { body, ValidationChain } from 'express-validator';

export const createTeacherRules: ValidationChain[] = [
  body('name')
    .notEmpty()
    .withMessage('Name should not be empty')
    .isAlpha()
    .withMessage('Name should contain only letters')
    .isLength({ min: 6, max: 30 })
    .withMessage('Name should contain atleast 6-30 characters'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Please provide a valid email address'),
  body('mobile')
    .notEmpty()
    .withMessage('Mobile number is a required field')
    .isMobilePhone('any')
    .withMessage('Invalid mobile number'),
  body('gender')
    .notEmpty()
    .withMessage('Gender is a required field')
    .isIn(['male', 'female', 'other'])
    .withMessage('Invalid gender'),
  body('specialization')
    .notEmpty()
    .withMessage('Specialzation is a required field'),
  body('yearsOfExperience')
    .notEmpty()
    .withMessage('Years of experience is a required field')
    .isInt({ min: 0 })
    .withMessage('Years of experience should be a positive integer'),
  body('street').optional().notEmpty().withMessage('Street is required'),
  body('city').optional().notEmpty().withMessage('City is required'),
  body('state').optional().notEmpty().withMessage('State is required'),
  body('zip').optional().isPostalCode('any').withMessage('Invalid ZIP code')
];
