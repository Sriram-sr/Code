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
export const getStudents: RequestHandler = (req, res, next) => {
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

// @route   POST api/v1/student/
// @desc    Created a student
// @access  Private
export const createStudent: RequestHandler = (
  req: CustomRequest,
  res,
  next
) => {
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

// @route   PUT api/v1/student/enroll-course
// @desc    Enrolls a course
// @access  Private
export const enrollCourse: RequestHandler = (req: CustomRequest, res, next) => {
  const courseCode: string = req.body.courseCode;
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
