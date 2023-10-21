import { Router } from 'express';
import { ToDo, RequestBody, RequestParams } from '../types/todo';

const router = Router();

let todos: ToDo[] = [];

router.get('/', (req, res, next) => {
    res.status(200).json(todos);
});

router.post('/todo', (req, res, next) => {
    const _id = new Date().toISOString();
    const body: RequestBody = req.body;
    const text = body.text;
    const result: ToDo = {
        _id: _id,
        text: text
    }
    todos.push(result);

    res.status(201).json({
        message: 'Todo Posted Successfully',
        todo: result,
        todos: todos
    });
});

router.put('/todos/:todoId', (req, res, next) => {
    const params = req.params as RequestParams;
    const todoId = params.todoId;
    const todoIndex = todos.findIndex(todo => todo._id === todoId);
    if (todoIndex > 0) {
        todos[todoIndex] = {
            _id: todos[todoIndex]._id,
            text: req.body.text
        }
    }
    res.status(404).json({
        message: 'Todo not found'
    });
});

router.delete('/todos/:todoId', (req, res, next) => {
    const params = req.params as RequestParams;
    const todoId = params.todoId;
    const todoIndex = todos.findIndex(todo => todo._id === todoId);
    if (todoIndex >= 0) {
        todos = todos.filter(todo => todo._id !== todoId);
        return res.status(200).json({
            message: 'Deleted todo successfully',
            todos: todos
        })
    }
    res.status(404).json({
        message: 'Todo not found'
    });
});

export default router;