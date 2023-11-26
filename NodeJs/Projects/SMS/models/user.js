const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  resetToken: String,
  resetTokenExpiry: Date,
  role: {
    type: String,
    enum: ['admin', 'teacher', 'student'],
    default: 'student'
  }
});

module.exports = mongoose.model('User', userSchema);
