const express = require('express');
const isAuth = require('../middlewares/is-auth');
const {
  getTeachers,
  createTeacher
} = require('../controllers/teacher-controller');
const { teacherCreateValidation } = require('../validation/teacher-validation');

const router = express.Router();

router
  .route('/')
  .get(isAuth, getTeachers)
  .post(isAuth, teacherCreateValidation, createTeacher);

module.exports = router;
