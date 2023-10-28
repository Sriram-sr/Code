const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  taskname: {
    type: String,
    trim: true,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
