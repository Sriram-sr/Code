import { RequestHandler } from 'express';
import Course from '../models/Course';
import {
  HTTP_STATUS,
  errorHandler,
  checkValidationFields
} from '../utils/error-handler';
import {
  addDepartmentReqBody,
  CustomRequest,
  addCourseReqBody
} from '../Types/req-body-types';
import Department from '../models/Department';

const generateRandomCode = (len: number): string => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < len; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

// @route   GET api/v1/admin/course
// @desc    Gets list of all courses
// @access  Public
export const getCourses: RequestHandler = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 3;
  Course.find()
    .skip((+currentPage - 1) * perPage)
    .limit(perPage)
    .then(courses => {
      res.status(HTTP_STATUS.OK).json({
        message: 'Successfully fetched courses',
        allCourses: courses.length,
        courses
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not get courses currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};

// @route   GET api/v1/admin/department
// @desc    Gets list of all departments
// @access  Private(Admin)
export const getDepartments: RequestHandler = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 2;
  Department.find()
    .skip((+currentPage - 1) * perPage)
    .limit(perPage)
    .then(departments => {
      res.status(HTTP_STATUS.OK).json({
        message: 'Successfully fetched departments',
        departments
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not get departments currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};

// @route   POST api/v1/admin/department
// @desc    Creates new department
// @access  Private(Admin)
export const addDepartment: RequestHandler = (req, res, next) => {
  checkValidationFields(req);
  const { departmentName, description, headOfDepartment } =
    req.body as addDepartmentReqBody;

  let codePrefix = '';
  const codePrefixesSplitted = departmentName.split(' ');
  if (codePrefixesSplitted.length > 1) {
    codePrefix = codePrefixesSplitted[0][0] + codePrefixesSplitted[1][0];
  } else {
    codePrefix = departmentName.slice(0, 2);
  }
  const departmentCode = codePrefix.toUpperCase() + generateRandomCode(3);
  Department.create({
    departmentName,
    departmentCode,
    description,
    headOfDepartment,
    coursesOffered: 1
  })
    .then(department => {
      res.status(HTTP_STATUS.CREATED).json({
        message: 'Successfully created department',
        department
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not add department currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};

// @route   POST api/v1/admin/course
// @desc    Creates a new course
// @access  Private(Admin)
export const addCourse: RequestHandler = (req: CustomRequest, res, next) => {
  checkValidationFields(req);
  const { courseName, coursePrefix, credits, ratings } =
    req.body as addCourseReqBody;

  const courseCode = coursePrefix + generateRandomCode(3);
  Course.create({
    courseName,
    courseCode,
    department: req.departmentId,
    credits,
    ratings
  })
    .then(course => {
      res.status(HTTP_STATUS.CREATED).json({
        message: 'Successfully created course',
        course
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, Could not add course currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};
