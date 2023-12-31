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
const getCourses: RequestHandler = (req, res, next) => {
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
const getDepartments: RequestHandler = (req, res, next) => {
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

// @route   GET api/v1/admin/course/:courseId
// @desc    Gets single course
// @access  Public
const getSingleCourse: RequestHandler = (req, res, next) => {
  const courseId: string = req.params.courseId;
  Course.findById(courseId)
    .then(course => {
      if (!course) {
        return errorHandler(
          'No course found with given course ID',
          HTTP_STATUS.NOT_FOUND,
          next
        );
      }
      res.status(HTTP_STATUS.OK).json({
        message: 'Sucessfully fetched course',
        course
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not get course currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};

// @route   POST api/v1/admin/department
// @desc    Creates new department
// @access  Private(Admin)
const addDepartment: RequestHandler = (req, res, next) => {
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
const addCourse: RequestHandler = (req: CustomRequest, res, next) => {
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

// @route   PUT api/v1/admin/course/:courseId
// @desc    Updates the course
// @access  Private(Admin)
const updateCourse: RequestHandler = (req, res, next) => {
  checkValidationFields(req);
  const courseId: string = req.params.courseId;
  const { courseName, credits, ratings } = req.body as addCourseReqBody;

  Course.findById(courseId)
    .then(course => {
      if (!course) {
        return errorHandler(
          'No course found with given course ID',
          HTTP_STATUS.NOT_FOUND,
          next
        );
      }
      course.courseName = courseName;
      course.credits = credits;
      course.ratings = ratings;
      course
        .save()
        .then(course => {
          res.status(HTTP_STATUS.OK).json({
            message: 'Successfully updated the course',
            course
          });
        })
        .catch(err =>
          errorHandler(
            'Something went wrong, Could not update the course currently',
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            next,
            err
          )
        );
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not update the course currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};

// @route   DELETE api/v1/admin/course/:courseId
// @desc    Deletes the course
// @access  Private(Admin)
const deleteCourse: RequestHandler = (req, res, next) => {
  const courseId: string = req.params.courseId;
  Course.findById(courseId)
    .then(course => {
      if (!course) {
        return errorHandler(
          'No course found with given course ID',
          HTTP_STATUS.NOT_FOUND,
          next
        );
      }
      course
        .deleteOne()
        .then(() => {
          res.status(HTTP_STATUS.OK).json({
            message: 'Successfully deleted course'
          });
        })
        .catch(err =>
          errorHandler(
            'Something went wrong, could not get course currently',
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            next,
            err
          )
        );
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not get course currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};

export {
  getCourses,
  getDepartments,
  getSingleCourse,
  addCourse,
  updateCourse,
  deleteCourse,
  addDepartment
};
