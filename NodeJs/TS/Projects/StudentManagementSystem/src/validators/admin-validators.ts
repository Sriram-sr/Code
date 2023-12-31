import { body } from 'express-validator';
import Department from '../models/Department';

export const addDepartmentRules = [
  body('departmentName')
    .notEmpty()
    .withMessage('Department name is a required field')
    .isLength({ max: 30, min: 5 })
    .withMessage(
      'Department name should be atleast 5 to maximum 30 characters'
    ),

  body('description')
    .optional()
    .isLength({ max: 150, min: 10 })
    .withMessage('Description should be atleast 10 to maximum 150 characters'),

  body('headOfDepartment')
    .notEmpty()
    .withMessage('HeadOfDepartment is a required field')
    .isLength({ max: 15, min: 5 })
    .withMessage(
      'HeadOfDepartment should be atleast 5 to maximum 15 characters'
    )
];

export const addCourseRules = [
  body('courseName')
    .notEmpty()
    .withMessage('Course name is a required field')
    .isLength({ max: 40, min: 10 })
    .withMessage('Course name should be atleast 10 to maximum 40 characters'),

  body('coursePrefix')
    .notEmpty()
    .withMessage('Course prefix is a required field')
    .isLength({ min: 2, max: 2 })
    .withMessage('Course prefix must be exactly 2 characters')
    .isUppercase()
    .withMessage('Course prefix must be in uppercase letters'),

  body('departmentName').custom(async (value, { req }) => {
    try {
      const department = await Department.findOne({ departmentName: value });
      if (!department) {
        return Promise.reject('Please enter a valid department name');
      }
      req.departmentId = department._id.toString();
      return true;
    } catch (error) {
      console.log('Database Error!');
      return Promise.reject('Validation failed. Please try again.');
    }
  }),

  body('credits')
    .notEmpty()
    .withMessage('Credits is a required field')
    .isInt({ min: 2, max: 5 })
    .withMessage('Credits should be a number between 2 and 5'),

  body('ratings')
    .notEmpty()
    .withMessage('Ratings is a required field')
    .isFloat({ min: 1, max: 10 })
    .withMessage('Ratings should be a number between 1 and 10')
];

export const updateCourseRules = [
  addCourseRules[0],
  addCourseRules[3],
  addCourseRules[4]
];
