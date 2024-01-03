import { Router } from 'express';
import isAuth from '../middlewares/is-auth';
import isAdmin from '../middlewares/is-admin';
import {
  createDepartmentRules,
  createCourseRules,
  updateCourseRules
} from '../validators/admin-validators';
import {
  getCourses,
  getSingleCourse,
  getDepartments,
  getCourseEnrolledStudents,
  createDepartment,
  createCourse,
  updateCourse,
  deleteCourse
} from '../controllers/admin-controllers';

const router = Router();

router
  .route('/course')
  .get(getCourses)
  .post(isAuth, isAdmin, createCourseRules, createCourse);
router
  .route('/course/:courseId')
  .get(getSingleCourse)
  .put(isAuth, isAdmin, updateCourseRules, updateCourse)
  .delete(isAuth, isAdmin, deleteCourse);
router
  .route('/course/:courseId/students')
  .get(isAuth, isAdmin, getCourseEnrolledStudents);
router
  .route('/department')
  .get(isAuth, isAdmin, getDepartments)
  .post(isAuth, isAdmin, createDepartmentRules, createDepartment);

export default router;
