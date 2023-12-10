const User = require('../models/User');
const Teacher = require('../models/Teacher');
const {
  errorHandler,
  checkFieldsValidation
} = require('../utils/error-handler');

// @route   GET api/v1/teacher/
// @desc    Gets all teachers
// @access  Private(Only admin have permissions)
const getTeachers = (req, res, next) => {
  User.findById(req.userId)
    .then(user => {
      if (user.role !== 'admin') {
        return errorHandler('Only admin can get all teachers', 403, next);
      }
      Teacher.find().then(teachers => {
        res.status(200).json({
          message: 'Successfully fetched teachers',
          totalStudents: teachers.length,
          teachers: teachers
        });
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, Could not get teachers currently',
        500,
        next,
        err
      )
    );
};

// @route   POST api/v1/teacher/
// @desc    Creates teacher
// @access  Private
const createTeacher = (req, res, next) => {
  checkFieldsValidation(req);
  const {
    name,
    email,
    mobile,
    gender,
    specialization,
    yearsOfExperience,
    street,
    city,
    state,
    zip
  } = req.body;

  let address;
  if (street && city && state && zip) {
    address = {
      street,
      city,
      state,
      zip
    };
  }
  Teacher.create({
    user: req.userId,
    name,
    mobile,
    gender,
    specialization,
    yearsOfExperience,
    email,
    address
  })
    .then(teacher => {
      res.status(201).json({
        message: 'Successfully created teacher',
        teacher: teacher
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, Could not create teacher currently',
        500,
        next,
        err
      )
    );
};

module.exports = {
  getTeachers,
  createTeacher
};
