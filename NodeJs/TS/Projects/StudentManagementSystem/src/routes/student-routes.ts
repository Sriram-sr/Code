import { Router } from 'express';
import isAuth from '../middlewares/is-auth';
import isAdmin from '../middlewares/is-admin';
import { createStudentRules } from '../validators/student-validators';
import { getStudents, createStudent } from '../controllers/student-controllers';

const router = Router();

router
  .route('/')
  .get(isAuth, isAdmin, getStudents)
  .post(isAuth, createStudentRules, createStudent);

export default router;
