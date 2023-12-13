const Course = require('../models/Course');
const Department = require('../models/Department');
const User = require('../models/User');
const { errorHandler } = require('../utils/error-handler');

function generateRandomCode(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const isAdmin = (req, res, next) => {
  User.findById(req.userId)
    .then(user => {
      if (user.role !== 'admin') {
        return errorHandler('Only admin can access this route', 403, next);
      }
      next();
    })
    .catch(err => errorHandler('Something went wrong', 500, next, err));
};

// @route   GET api/v1/department/
// @desc    Gets all departments
// @access  Private(Only admin have permissions)
const getDepartments = (req, res, next) => {
  Department.find()
    .then(departments => {
      res.status(200).json({
        message: 'Successfully fetched departments',
        totalDepartments: departments.length,
        departments: departments
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, Could not add department currently',
        500,
        next,
        err
      )
    );
};

// @route   POST api/v1/department/
// @desc    Creates new department
// @access  Private(Only admin have permissions)
const addDepartment = (req, res, next) => {
  const { departmentName, description, headOfDepartment } = req.body;

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
      res.status(201).json({
        message: 'Successfully added the department',
        department: department
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, Could not add department currently',
        500,
        next,
        err
      )
    );
};

// @route   GET api/v1/course/
// @desc    Gets all courses.
// @access  Public
const getCourses = (req, res, next) => {
  Course.find()
    .then(courses => {
      res.status(200).json({
        message: 'Successfully fetched courses',
        totalCourses: courses.length,
        courses
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, Could not get courses currently',
        500,
        next,
        err
      )
    );
};

// @route   POST api/v1/course/
// @desc    Creates new course.
// @access  Private(Only admin have permissions)
const addCourse = (req, res, next) => {
  const { courseName, coursePrefix, departmentName, credits, ratings } =
    req.body;
  const courseCode = coursePrefix + generateRandomCode(3);
  Department.findOne({ departmentName: departmentName })
    .then(department => {
      return Course.create({
        courseName,
        courseCode,
        department: department._id,
        credits,
        ratings
      });
    })
    .then(course => {
      res.status(201).json({
        message: 'Successfully created course',
        course
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, Could not add course currently',
        500,
        next,
        err
      )
    );
};

module.exports = {
  isAdmin,
  getDepartments,
  addDepartment,
  getCourses,
  addCourse
};
