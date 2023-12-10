const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const departmentSchema = new Schema({
  departmentName: {
    type: String,
    required: true,
    unique: true
  },
  departmentCode: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  headOfDepartment: {
    type: String,
    required: true
  },
  coursesOffered: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Department', departmentSchema);
