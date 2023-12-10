const { body } = require('express-validator');

const teacherCreateValidation = [
  body('name')
    .isAlpha()
    .withMessage('Name should contain only letters')
    .isLength({ min: 6, max: 30 })
    .withMessage('Name should contain atleast 6-30 characters')
    .notEmpty()
    .withMessage('Name should not be empty'),
  body('email', 'Please enter a valid email address').isEmail(),
  body('mobile').isMobilePhone('any').withMessage('Invalid mobile number'),
  body('gender')
    .isIn(['male', 'female', 'other'])
    .withMessage('Invalid gender'),
  body('specialization').notEmpty().withMessage('Specialization is required'),
  body('yearsOfExperience')
    .isInt({ min: 0 })
    .withMessage('Years of experience should be a positive integer'),
  body('street').optional().notEmpty().withMessage('Street is required'),
  body('city').optional().notEmpty().withMessage('City is required'),
  body('state').optional().notEmpty().withMessage('State is required'),
  body('zip').optional().isPostalCode('any').withMessage('Invalid ZIP code')
];

module.exports = {
  teacherCreateValidation
};
