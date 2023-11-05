const express = require('express');
const { body } = require('express-validator');
const {
  getStudents,
  createStudent,
  getSingleStudent,
  updateStudent,
  deleteStudent
} = require('../controllers/student');
const isAuth = require('../middlewares/is-auth');

const router = express.Router();

router.route('/students').get(isAuth, getStudents).post(createStudent);
router
  .route('/students/:studentId')
  .get(getSingleStudent)
  .put(
    [body('name', 'Enter a valid name').isLength({ min: 6 }).trim()],
    updateStudent
  )
  .delete(deleteStudent);

module.exports = router;
