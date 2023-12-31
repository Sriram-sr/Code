import { Router } from 'express';
import isAuth from '../middlewares/is-auth';
import isAdmin from '../middlewares/is-admin';
import {
  addDepartmentRules,
  addCourseRules,
  updateCourseRules
} from '../validators/admin-validators';
import {
  getCourses,
  getSingleCourse,
  getDepartments,
  addDepartment,
  addCourse,
  updateCourse,
  deleteCourse
} from '../controllers/admin-controllers';

const router = Router();

router
  .route('/course')
  .get(getCourses)
  .post(isAuth, isAdmin, addCourseRules, addCourse);
router
  .route('/course/:courseId')
  .get(getSingleCourse)
  .put(isAuth, isAdmin, updateCourseRules, updateCourse)
  .delete(isAuth, isAdmin, deleteCourse);
router
  .route('/department')
  .get(isAuth, isAdmin, getDepartments)
  .post(isAuth, isAdmin, addDepartmentRules, addDepartment);

export default router;
