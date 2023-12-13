const express = require('express');
const isAuth = require('../middlewares/is-auth');
const {
  isAdmin,
  getDepartments,
  addDepartment,
  getCourses,
  addCourse
} = require('../controllers/admin-controller');

const router = express.Router();

router
  .route('/department')
  .get(isAuth, isAdmin, getDepartments)
  .post(isAuth, isAdmin, addDepartment);
router.route('/course').get(getCourses).post(isAuth, isAdmin, addCourse);

module.exports = router;
