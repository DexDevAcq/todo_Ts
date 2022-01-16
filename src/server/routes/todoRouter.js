const express = require('express');
const todoController = require('../controller/todoController');
const router = express.Router();


router.post('/', todoController.createTodo);

router.get('/', todoController.getTodos);

router.put('/:id', todoController.updateTodo);

router.delete('/:id', todoController.deleteTodo);




module.exports = router