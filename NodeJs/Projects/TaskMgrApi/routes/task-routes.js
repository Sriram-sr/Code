const express = require('express');
const { getTasks, postTask, getSingleTask, updateTask, deleteTask } = require('../controllers/task');

const router = express.Router();

router.route('/').get(getTasks).post(postTask);
router.route('/:taskId').get(getSingleTask).put(updateTask).delete(deleteTask);

module.exports = router;
