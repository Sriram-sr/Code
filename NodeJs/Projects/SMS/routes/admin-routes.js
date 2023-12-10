const express = require('express');
const isAuth = require('../middlewares/is-auth');
const {
  isAdmin,
  getDepartments,
  addDepartment
} = require('../controllers/admin-controller');

const router = express.Router();

router
  .route('/department')
  .get(isAuth, isAdmin, getDepartments)
  .post(isAuth, isAdmin, addDepartment);
router.route('/course');

module.exports = router;
