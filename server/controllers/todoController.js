require('dotenv').config()
const pool = require('../db')

const todoController = {
    async createTodo(req, res) {
        const {todo, todo_creator} = req.body 

        try {
            if (todo.length < 0) {
                return res.status(401).json({message: 'cannot create an empty todo'})
            }
            
            let todo_created = await pool.query("INSERT INTO todos (todo, todo_creator ) VALUES ($1, $2) RETURNING *", 
                [todo, todo_creator]
            
            )
            res.status(201).send({success: true, message: 'created successfully', todo: todo_created.rows[0]})
        } catch (error) {
            res.status(401).send(error)
        }

    },

    async getTodos(req, res) {
        try {
            const tasks = await pool.query("SELECT * FROM todos WHERE todo_creator = $1", [req.user])
            if(tasks.rows.length === 0){
                res.send({errorTasks: 'no tasks yet'})
            }
            res.status(201).send({todos: tasks.rows})
        } catch (error) {
            res.status(500).send(error.message)
        }
    },

    async getCompletedTodos(req, res) {
        try {
            const tasks = await pool.query("SELECT * FROM todos WHERE todo_creator = $1 AND iscompleted = true", [req.user])
            if(tasks.rows.length === 0){
                res.send({errorTasks: 'no tasks yet'})
            }
            res.status(201).send({todos: tasks.rows})
        } catch (error) {
            res.status(500).send(error.message)
        }
    },
    async getUnCompletedTodos(req, res) {
        try {
            const tasks = await pool.query("SELECT * FROM todos WHERE todo_creator = $1 AND iscompleted = false", [req.user])
            if(tasks.rows.length === 0){
                res.send({errorTasks: 'no tasks yet'})
            }
            res.status(201).send({todos: tasks.rows})
        } catch (error) {
            res.status(500).send(error.message)
        }
    },

    async singleTodo(req, res) {
        try {
            const todo = await pool.query("SELECT * FROM todos WHERE todo_id = $1", [req.body.todo_id])

            if(!todo.rows[0]) return res.status(404).send('todo not found')

            res.status(200).send(todo.rows[0])
        } catch (error) {
            res.status(404).send(error.message)   
        }
    },
 
    async markAsCompleted(req, res) {
        const { todo_id} = req.body
        try {
            const completed = await pool.query("UPDATE todos set iscompleted = true WHERE todo_id = $1 RETURNING *", 
            [todo_id] )
            res.status(201).send({success: true, message: 'updated successfully', completedTodo: completed.rows[0]})
        } catch (error) {
            res.status(401).send(error.message)
        }
    },

    async updateTodo(req, res) {
        const {todo, todo_id} = req.body
        try {
            const updated = await pool.query("UPDATE todos set todo = $1 WHERE todo_id = $2 RETURNING *", 
            [todo, todo_id] )
            res.status(201).send({success: true, message: 'updated successfully', completedTodo: updated.rows[0]})
        } catch (error) {
            res.status(401).send(error.message)
        }
    },

    async deleteTodo(req, res){
        const {todo_id} = req.params
        try {
            await pool.query("DELETE FROM todos WHERE todo_id = $1 RETURNING *", [todo_id] )
            res.status(201).send({success: true, message: 'deleted successfully'})
        } catch (error) {
            res.status(401).send(error)
        }
    },

    async createSubTodo(req, res) {
        const {subtodo, todo_creator, todo_under} = req.body 

        try {
            if (subtodo.length < 0) {
                return res.status(401).json({message: 'cannot create an empty todo'})
            }
            
            let subtodo_created = await pool.query("INSERT INTO subtodos (subtodo, todo_creator, todo_under ) VALUES ($1, $2, $3) RETURNING *", 
                [subtodo, todo_creator, todo_under]
            
            )
            res.status(201).send({success: true, message: 'created successfully', subtodoo: subtodo_created.rows})
        } catch (error) {
            res.status(401).send(error)
        }

    },

    async getSubTodos(req, res){
        try {
            let subTodos = await pool.query("SELECT * FROM subtodos WHERE todo_under = $1", [req.body.todo])
            res.status(201).json({subTodos: subTodos.rows})
        } catch (error) {
            res.status(401).send(error)
        }
    },

    async markSubTodoAsCompleted(req, res) {
        const { isCompleted, subtodo_id } = req.body
        try {
            
            let completedSubTodo = await pool.query("UPDATE subtodos set isCompleted = $1 WHERE subtodo_id = $2 RETURNING *", 
                [isCompleted, subtodo_id]
            
            )
            res.status(201).send({success: true, message: 'created successfully', completedTodo: completedSubTodo.rows})
        } catch (error) {
            res.status(401).send(error)
        }
    },

    
    async deleteSubTodo(req, res){
        const {subtodo_id} = req.body
        try {
            const deleted_todo = await pool.query("DELETE FROM subtodos WHERE subtodo_id = $1 RETURNING *", [subtodo_id])
            res.status(201).send({success: true, message: 'deleted successfully', deleted_todo: deleted_todo.rows})
        } catch (error) {
            res.status(401).send(error)
        }
    },


}


module.exports = {todoController}