const Student = require('../models/Student');
const User = require('../models/User');
const {
  errorHandler,
  checkFieldsValidation,
} = require('../utils/error-handler');

// @route   GET api/v1/student/
// @desc    Gets all students
// @access  Public
const getStudents = (req, res, next) => {
  Student.find()
    .then(students => {
      res.status(200).json({
        message: 'Successfully fetched students',
        totalStudents: students.length,
        students: students,
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, Could not get students currently',
        500,
        next,
        err
      )
    );
};

// @route   POST api/v1/student/
// @desc    Creates student
// @access  Private
const createStudent = (req, res, next) => {
  const { name, age, gender, contact, address, nationality } = req.body;
  const student = new Student({
    name: name,
    age: age,
    gender: gender,
    contact: {
      email: contact.email,
      phone: contact.phone,
    },
    address: {
      street: address.street,
      city: address.street,
      state: address.state,
      zip: address.zip,
    },
    nationality: nationality,
    userId: req.userId,
  });
  student
    .save()
    .then(student => {
      res.json({
        message: 'Student saved successfully',
        student: student,
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, Could not create student currently',
        500,
        next,
        err
      )
    );
};

// @route   GET api/v1/student/:studentId
// @desc    Gets single student information
// @access  Public
const getSingleStudent = (req, res, next) => {
  const studentId = req.params.studentId;
  Student.findById(studentId)
    .then(student => {
      if (!student) {
        return errorHandler('No student found with given ID', 422, next);
      }
      res.status(200).json({
        message: 'Student retreived successfully',
        student: student,
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, Could not get student currently',
        500,
        next,
        err
      )
    );
};

// Should work on this
const updateStudent = (req, res, next) => {
  checkFieldsValidation(req);
  const studentId = req.params.studentId;
  res.json({});
  // Student.updateOne({ _id: studentId }, req.body)
  //   .then(result => {
  //     console.log(result);
  //     return Student.findById(studentId);
  //   })
  //   .then(student => {
  //     res.status(200).json({
  //       message: 'Student updated successfully',
  //       student: student
  //     });
  //   })
  //   .catch(err => errorHandler(err, next));
};

// @route   DELETE api/v1/student/:studentId
// @desc    Deletes a student
// @access  Private
const deleteStudent = (req, res, next) => {
  const studentId = req.params.studentId;
  Student.findById(studentId)
    .then(student => {
      if (!student) {
        return errorHandler('No student found with given ID', 422, next);
      }
      if (student.userId.toString() !== req.userId) {
        return errorHandler(
          'Should not delete student created by other users',
          403,
          next
        );
      }
      student.deleteOne().then(() => {
        User.findById(req.userId)
          .then(user => {
            return user.deleteOne();
          })
          .then(() => {
            res.status(200).json({
              message: 'Student deleted successfully',
            });
          })
          .catch(err =>
            errorHandler(
              'Something went wrong, Could not delete the student currently',
              500,
              next,
              err
            )
          );
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, Could not delete the student currently',
        500,
        next,
        err
      )
    );
};

module.exports = {
  getStudents,
  createStudent,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
