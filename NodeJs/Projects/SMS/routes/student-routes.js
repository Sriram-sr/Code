const express = require('express');
const { validateUpdateStudent } = require('../validation/student-validation');
const {
  getStudents,
  createStudent,
  getSingleStudent,
  updateStudent,
  deleteStudent,
} = require('../controllers/student-controller');
const isAuth = require('../middlewares/is-auth');

const router = express.Router();

router.route('/').get(isAuth, getStudents).post(isAuth, createStudent);
router
  .route('/:studentId')
  .get(getSingleStudent)
  .put(validateUpdateStudent, updateStudent)
  .delete(isAuth, deleteStudent);

module.exports = router;
