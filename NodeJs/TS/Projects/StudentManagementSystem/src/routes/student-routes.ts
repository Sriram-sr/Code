import { Router } from 'express';
import isAuth from '../middlewares/is-auth';
import isAdmin from '../middlewares/is-admin';
import { createStudentRules } from '../validators/student-validators';
import { getStudents, createStudent, enrollCourse } from '../controllers/student-controllers';

const router = Router();

router
  .route('/')
  .get(isAuth, isAdmin, getStudents)
  .post(isAuth, createStudentRules, createStudent);
router.route('/enroll-course').put(isAuth, enrollCourse);

export default router;
