import { RequestHandler } from 'express';
import Course from '../models/Course';
import { HTTP_STATUS, errorHandler } from '../utils/error-handler';

// @route   GET api/v1/admin/course
// @desc    Gets list of all courses
// @access  Public
export const getCourses: RequestHandler = (req, res, next) => {
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
