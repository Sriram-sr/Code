const Task = require('../models/Task');
const errorHandler = require('../utils/error-handler');
const asyncWrapper = require('../utils/async-wrapper'); // For error handling in async functions

const raiseNotFoundError = (task, taskId) => {
  if (!task) {
    const error = new Error(`Task with ID ${taskId} not found`);
    error.statusCode = 404;
    throw error;
  }
};

exports.getTasks = asyncWrapper(async (req, res, next) => {
  const tasks = await Task.find();
  res.status(200).json({
    message: 'Tasks retreived succesfully',
    totalTasks: tasks.length,
    tasks: tasks
  });
});

exports.getSingleTask = (req, res, next) => {
  const taskId = req.params.taskId;
  Task.findById(taskId)
    .then(task => {
      raiseNotFoundError(task, taskId);
      res.status(200).json({
        message: 'Task retreived succesfully',
        task: task
      });
    })
    .catch(err => {
      errorHandler(err, next);
    });
};

exports.postTask = (req, res, next) => {
  const { taskname, completed } = req.body;
  Task.create({
    taskname: taskname,
    completed: completed
  })
    .then(task => {
      res.status(201).json({
        message: 'Task addded successfully',
        task: task
      });
    })
    .catch(err => {
      errorHandler(err, next);
    });
};

exports.updateTask = (req, res, next) => {
  const taskId = req.params.taskId;
  const { taskname: updatedTaskname, completed: updatedCompleted } = req.body;
  let taskToUpdate;
  Task.findById(taskId)
    .then(task => {
      raiseNotFoundError(task, taskId);
      taskToUpdate = task;
      taskToUpdate.taskname = updatedTaskname;
      taskToUpdate.completed = updatedCompleted;
      return taskToUpdate.save();
    })
    .then(() => {
      res.status(200).json({
        message: 'Task updated succesfully',
        task: taskToUpdate
      });
    })
    .catch(err => {
      errorHandler(err, next);
    });
};

exports.deleteTask = (req, res, next) => {
  const taskId = req.params.taskId;
  Task.findById(taskId)
    .then(task => {
      raiseNotFoundError(task, taskId);
      return Task.findByIdAndRemove(taskId);
    })
    .then(() => {
      res.status(200).json({
        message: 'Task deleted successfully'
      });
    })
    .catch(err => {
      errorHandler(err, next);
    });
};

exports.raiseNotFoundError = raiseNotFoundError;