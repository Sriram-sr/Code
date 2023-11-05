const Student = require('../models/student');
const {
  errorHandler,
  checkFieldsValidation
} = require('../utils/error-handler');

exports.getStudents = (req, res, next) => {
  Student.find()
    .then(students => {
      return res.status(200).json({
        message: 'Students Fetched Successfully',
        totalStudents: students.length,
        students: students
      });
    })
    .catch(err => errorHandler(err, next));
};

exports.createStudent = (req, res, next) => {
  const { name, age, gender, contact, address } = req.body;
  const student = new Student({
    name: name,
    age: age,
    gender: gender,
    contact: {
      email: contact.email,
      phone: contact.phone
    },
    address: {
      street: address.street,
      city: address.street,
      state: address.state,
      zip: address.zip
    }
  });
  student
    .save()
    .then(student => {
      res.json({
        message: 'Student saved successfully',
        student: student
      });
    })
    .catch(err => errorHandler(err, next));
};

exports.getSingleStudent = (req, res, next) => {
  const studentId = req.params.studentId;
  Student.findById(studentId)
    .then(student => {
      if (!student) {
        const error = new Error('No student found with given ID');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        message: 'Student retreived successfully',
        student: student
      });
    })
    .catch(err => errorHandler(err, next));
};

exports.updateStudent = (req, res, next) => {
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

exports.deleteStudent = (req, res, next) => {
  const studentId = req.params.studentId;
  Student.findById(studentId)
    .then(student => {
      if (!student) {
        const error = new Error('No student found with given ID');
        error.statusCode = 404;
        throw error;
      }
      return student.deleteOne();
    })
    .then(() => {
      res.status(200).json({
        message: 'Student deleted successfully'
      });
    })
    .catch(err => errorHandler(err, next));
};
