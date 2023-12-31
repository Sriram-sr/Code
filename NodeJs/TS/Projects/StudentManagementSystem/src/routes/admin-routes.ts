import { Router } from 'express';
import isAuth from '../middlewares/is-auth';
import isAdmin from '../middlewares/is-admin';
import {
  addDepartmentRules,
  addCourseRules
} from '../validators/admin-validators';
import {
  getCourses,
  getDepartments,
  addDepartment,
  addCourse
} from '../controllers/admin-controllers';

const router = Router();

router
  .route('/course')
  .get(getCourses)
  .post(isAuth, isAdmin, addCourseRules, addCourse);
router
  .route('/department')
  .get(isAuth, isAdmin, getDepartments)
  .post(isAuth, isAdmin, addDepartmentRules, addDepartment);

export default router;
