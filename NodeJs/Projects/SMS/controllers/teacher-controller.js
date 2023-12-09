const Teacher = require('../models/Teacher');
const {
  errorHandler,
  checkFieldsValidation,
} = require('../utils/error-handler');

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
    zip,
  } = req.body;

  let address;
  if (street && city && state && zip) {
    address = {
      street,
      city,
      state,
      zip,
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
    address,
  })
    .then(teacher => {
      res.status(201).json({
        message: 'Successfully created teacher',
        teacher: teacher,
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
  createTeacher,
};
