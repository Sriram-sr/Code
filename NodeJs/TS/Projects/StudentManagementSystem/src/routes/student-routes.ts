import { Router } from 'express';
import isAuth from '../middlewares/is-auth';
import isAdmin from '../middlewares/is-admin';
import { createStudentRules } from '../validators/student-validators';
import {
  getStudents,
  getSingleStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  getEnrolledCourses,
  enrollCourse,
  unEnrollCourse
} from '../controllers/student-controllers';

const router = Router();

router
  .route('/')
  .get(isAuth, isAdmin, getStudents)
  .post(isAuth, createStudentRules, createStudent);
router
  .route('/:studentId')
  .get(isAuth, getSingleStudent)
  .put(isAuth, createStudentRules, updateStudent)
  .delete(isAuth, isAdmin, deleteStudent);
router.route('/courses').get(isAuth, getEnrolledCourses);
router.route('/enroll-course').put(isAuth, enrollCourse);
router.route('/unenroll-course').patch(isAuth, unEnrollCourse);

export default router;
