import { RequestHandler } from 'express';
import Teacher from '../models/Teacher';
import { CustomRequest, createTeacherReqBody } from '../Types/req-body-types';
import {
  HTTP_STATUS,
  errorHandler,
  checkValidationFields
} from '../utils/error-handler';

// @route   GET api/v1/teacher/
// @desc    Gets all teachers
// @access  Private(Admin)
export const getTeachers: RequestHandler = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 2;

  Teacher.find()
    .skip((+currentPage - 1) * perPage)
    .limit(perPage)
    .then(teachers => {
      res.status(HTTP_STATUS.OK).json({
        message: 'Successfully fetched teachers',
        teachers
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, could not get teachers currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};

// @route   POST api/v1/teacher/
// @desc    Creates a teacher
// @access  Private
export const createTeacher: RequestHandler = (
  req: CustomRequest,
  res,
  next
) => {
  checkValidationFields(req);

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
  } = req.body as createTeacherReqBody;

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
      res.status(HTTP_STATUS.CREATED).json({
        message: 'Successfully created teacher',
        teacher: teacher
      });
    })
    .catch(err =>
      errorHandler(
        'Something went wrong, Could not create teacher currently',
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        next,
        err
      )
    );
};
