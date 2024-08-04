const express = require('express')
const router = express.Router()
const todoController = require('./controller')
const auth = require('../user/middleware')

router.get('/', auth, todoController.getAllTodos)
router.get('/:todoId', auth, todoController.getTodoById)
router.post('/', auth, todoController.createTodo)
router.patch('/:todoId', auth, todoController.updateTodo)
router.delete('/:todoId', auth, todoController.deleteTodo)

module.exports = router
