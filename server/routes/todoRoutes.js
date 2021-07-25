const express = require('express')

const router = express.Router()

const authorize = require('../middlewares/authorize')

const {todoController} = require('../controllers/todoController')

router.post('/createTodo', todoController.createTodo)

router.get('/getTodos', authorize, todoController.getTodos)

router.get('/getCompletedTodos', authorize, todoController.getCompletedTodos)
router.get('/getUnCompletedTodos', authorize, todoController.getUnCompletedTodos)

router.get('/todo/:id', todoController.singleTodo)

router.put('/markAsCompleted', todoController.markAsCompleted)
router.put('/update_task', todoController.updateTodo)

router.delete('/delete_todo/:todo_id', todoController.deleteTodo)

router.post('/createsubtodo', todoController.createSubTodo)



module.exports = router