import { RequestHandler } from 'express';
import { CustomRequest, createStudentReqBody } from '../Types/req-body-types';
import {
  HTTP_STATUS,
  errorHandler,
  checkValidationFields
} from '../utils/error-handler';
import Student from '../models/Student';

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
