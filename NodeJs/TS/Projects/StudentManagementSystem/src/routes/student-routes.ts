import { Router } from 'express';
import isAuth from '../middlewares/is-auth';
import isAdmin from '../middlewares/is-admin';
import { createStudentRules } from '../validators/student-validators';
import {
  getStudents,
  getEnrolledCourses,
  createStudent,
  enrollCourse,
  unEnrollCourse
} from '../controllers/student-controllers';

const router = Router();

router
  .route('/')
  .get(isAuth, isAdmin, getStudents)
  .post(isAuth, createStudentRules, createStudent);
router.route('/courses').get(isAuth, getEnrolledCourses);
router.route('/enroll-course').put(isAuth, enrollCourse);
router.route('/unenroll-course').patch(isAuth, unEnrollCourse);

export default router;
