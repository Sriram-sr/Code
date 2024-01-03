import { Router } from 'express';
import isAuth from '../middlewares/is-auth';
import isAdmin from '../middlewares/is-admin';
import { createTeacherRules } from '../validators/teacher-validators';
import { getTeachers, createTeacher } from '../controllers/teacher-controllers';

const router = Router();

router
  .route('/')
  .get(isAuth, isAdmin, getTeachers)
  .post(isAuth, createTeacherRules, createTeacher);

export default router;
