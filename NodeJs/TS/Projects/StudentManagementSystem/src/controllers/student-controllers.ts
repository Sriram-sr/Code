import { RequestHandler } from 'express';
import { CustomRequest, createStudentReqBody } from '../Types/req-body-types';
import {
  HTTP_STATUS,
  errorHandler,
  checkValidationFields
} from '../utils/error-handler';
import Student from '../models/Student';
import Course from '../models/Course';

// @route   GET api/v1/student/
// @desc    Gets all students
// @access  Private(Admin)
const getStudents: RequestHandler = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 2;
  Student.find()
    .limit((+currentPage - 1) * perPage)
    .skip(perPage)
    .then(students => {
      res.status(HTTP_STATUS.OK).json({
        message: 'Successfully fetched students',
        students
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not get students currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};

// @route   GET api/v1/student/:studentId
// @desc    Gets single student
// @access  Private
const getSingleStudent: RequestHandler = (req: CustomRequest, res, next) => {
  const studentId = (req.params as { studentId: string }).studentId;

  Student.findById(studentId)
    .populate('userId')
    .then(student => {
      if (!student) {
        return errorHandler(
          'Student with this ID is not found',
          HTTP_STATUS.NOT_FOUND,
          next
        );
      }
      if (student.userId.toString() !== req.userId && req.role !== 'admin') {
        return errorHandler(
          'Cannot view details of other students',
          HTTP_STATUS.FORBIDDEN,
          next
        );
      }
      res.status(HTTP_STATUS.OK).json({
        message: 'Sucessfully fetched student',
        student
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not get student currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};

// @route   POST api/v1/student/
// @desc    Created a student
// @access  Private
const createStudent: RequestHandler = (req: CustomRequest, res, next) => {
  checkValidationFields(req);

  const {
    name,
    age,
    gender,
    email,
    phone,
    street,
    city,
    state,
    zip,
    nationality
  } = req.body as createStudentReqBody;

  let address;
  if (street && city && state && zip) {
    address = {
      street,
      city,
      state,
      zip
    };
  }

  Student.create({
    name,
    age,
    gender,
    contact: {
      email,
      phone
    },
    address,
    nationality,
    coursesEnrolled: [],
    userId: req.userId
  })
    .then(student => {
      res.status(HTTP_STATUS.CREATED).json({
        message: 'Successfully saved student',
        student
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, Could not create student currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};

// @route   PUT api/v1/student/:studentId
// @desc    Updates student
// @access  Private
const updateStudent: RequestHandler = (req: CustomRequest, res, next) => {
  checkValidationFields(req);
  const studentId = (req.params as { studentId: string }).studentId;

  Student.findById(studentId)
    .populate('userId')
    .then(student => {
      if (!student) {
        return errorHandler(
          'Student with this ID is not found',
          HTTP_STATUS.NOT_FOUND,
          next
        );
      }
      if (
        student.userId._id.toString() !== req.userId &&
        req.role !== 'admin'
      ) {
        return errorHandler(
          'Cannot update details of other students',
          HTTP_STATUS.FORBIDDEN,
          next
        );
      }
      Student.findByIdAndUpdate(studentId, req.body, {
        new: true
      })
        .then(updatedStudent => {
          res.status(HTTP_STATUS.OK).json({
            message: 'Sucessfully updated student',
            student: updatedStudent
          });
        })
        .catch(err =>
          errorHandler(
            'Something went wrong, could not update student currently',
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            next,
            err
          )
        );
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not update student currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};

// @route   DELETE api/v1/student/:studentId
// @desc    Deletes student
// @access  Private(Admin)
const deleteStudent: RequestHandler = (req, res, next) => {
  const studentId = (req.params as { studentId: string }).studentId;

  Student.findById(studentId)
    .populate('userId')
    .then(student => {
      if (!student) {
        return errorHandler(
          'Student with this ID is not found',
          HTTP_STATUS.NOT_FOUND,
          next
        );
      }
      student
        .deleteOne()
        .then(() => {
          res.status(HTTP_STATUS.OK).json({
            message: 'Successfully deleted student'
          });
        })
        .catch(err =>
          errorHandler(
            'Something went wrong, could not delete student currently',
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            next,
            err
          )
        );
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not delete student currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};

// @route   GET api/v1/student/courses
// @desc    Gets enrolled courses of the student
// @access  Private
const getEnrolledCourses: RequestHandler = (req: CustomRequest, res, next) => {
  Student.findOne({ userId: req.userId })
    .populate('coursesEnrolled')
    .then(student => {
      res.status(HTTP_STATUS.OK).json({
        message: 'Successfully fetched enrolled courses',
        enrolledCourses: student?.coursesEnrolled
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

// @route   PUT api/v1/student/enroll-course
// @desc    Enrolls a course
// @access  Private
const enrollCourse: RequestHandler = (req: CustomRequest, res, next) => {
  const courseCode = (req.body as { courseCode: string }).courseCode;
  const serverErrorStr =
    'Something went wrong, Could not enroll course currently';

  Student.findOne({ userId: req.userId })
    .then(student => {
      Course.findOne({ courseCode: courseCode })
        .then(newCourse => {
          if (!newCourse) {
            return errorHandler(
              'Cannot able to find a course with given course code',
              HTTP_STATUS.NOT_FOUND,
              next
            );
          }
          if (student) {
            const preEnrolledCourses = student.coursesEnrolled;
            const existingCourse = preEnrolledCourses.find(
              course => course._id.toString() === newCourse._id.toString()
            );
            if (existingCourse) {
              return errorHandler(
                'Course already enrolled by the student',
                HTTP_STATUS.CONFLICT,
                next
              );
            }
            preEnrolledCourses.unshift(newCourse._id);
            student.coursesEnrolled = preEnrolledCourses;
            student
              .save()
              .then(updatedStudent => {
                res.status(HTTP_STATUS.OK).json({
                  message: 'Successfully enrolled course',
                  updatedStudent
                });
              })
              .catch(err =>
                errorHandler(
                  serverErrorStr,
                  HTTP_STATUS.INTERNAL_SERVER_ERROR,
                  next,
                  err
                )
              );
          }
        })
        .catch(err =>
          errorHandler(
            serverErrorStr,
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            next,
            err
          )
        );
    })
    .catch(err =>
      errorHandler(serverErrorStr, HTTP_STATUS.INTERNAL_SERVER_ERROR, next, err)
    );
};

// @route   PUT api/v1/student/unenroll-course
// @desc    Unenrolls a course
// @access  Private
const unEnrollCourse: RequestHandler = (req: CustomRequest, res, next) => {
  const courseCode = (req.body as { courseCode: string }).courseCode;
  const serverErrorStr =
    'Something went wrong, Could not unenroll course currently';

  Student.findOne({ userId: req.userId })
    .then(student => {
      Course.findOne({ courseCode: courseCode })
        .then(course => {
          if (!course) {
            return errorHandler(
              'Cannot able to find a course with given course code',
              HTTP_STATUS.NOT_FOUND,
              next
            );
          }
          if (student) {
            const preEnrolledCourses = student.coursesEnrolled;
            const existingCourseIdx = preEnrolledCourses.indexOf(course._id);
            if (existingCourseIdx === -1) {
              return errorHandler(
                'Course not yet enrolled by the student',
                HTTP_STATUS.NOT_FOUND,
                next
              );
            }
            preEnrolledCourses.splice(existingCourseIdx, 1);
            student.coursesEnrolled = preEnrolledCourses;
            student
              .save()
              .then(updatedStudent => {
                res.status(HTTP_STATUS.OK).json({
                  message: 'Successfully unenrolled course',
                  updatedStudent
                });
              })
              .catch(err =>
                errorHandler(
                  serverErrorStr,
                  HTTP_STATUS.INTERNAL_SERVER_ERROR,
                  next,
                  err
                )
              );
          }
        })
        .catch(err =>
          errorHandler(
            serverErrorStr,
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            next,
            err
          )
        );
    })
    .catch(err =>
      errorHandler(serverErrorStr, HTTP_STATUS.INTERNAL_SERVER_ERROR, next, err)
    );
};

export {
  getStudents,
  getSingleStudent,
  getEnrolledCourses,
  createStudent,
  updateStudent,
  deleteStudent,
  enrollCourse,
  unEnrollCourse
};
