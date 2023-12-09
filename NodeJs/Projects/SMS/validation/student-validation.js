const { body } = require('express-validator');

const validateUpdateStudent = body('name', 'Enter a valid name')
  .isLength({ min: 6 })
  .trim();

module.exports = {
  validateUpdateStudent,
};
