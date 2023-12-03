const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    reqiured: true
  },
  password: {
    type: String,
    reqiured: true
  },
  avatar: {
    type: String,
    reqiured: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('User', userSchema);
