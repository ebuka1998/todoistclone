import React, {createContext, useState} from 'react'
import axios from 'axios';
import { baseUrl } from '../utils/apiUrl';
import setToken from '../utils/setToken';

export const TodoContext = createContext()


export const TodoContextProvider = (props) => {
    const [updateTodo, setUpdateTodo] = useState('')
    const [updateTodoId, setUpdateTodoId] = useState('')
    const [isSignedIn, setIsSignedIn] = useState(false)
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({})

    const [todos, setTodos] = useState([])
    const [added, setAdded] = useState(false)
    const [marked, setMarked] = useState(false)

    const [error, setError] = useState({})

    const registerUser = async (dataToSubmit) => {
        const config = {
            headers: {
                "Content-Type": 'application/json'
            }
        }
        try {
            setLoading(true)
            const {data} = await axios.post(`${baseUrl}/createUser`, dataToSubmit, config)
            if(data){
                localStorage.setItem('todoistUser', data.token)
                setIsSignedIn(true)
            }
            setLoading(false)
        } catch (error) {
            setError(error.response.data)
            setLoading(false)
        }
    }

    const loginUser = async (dataToSubmit) => {
        const config = {
            headers: {
                "Content-Type": 'application/json'
            }
        }
        try {
            setLoading(true)
            const {data} = await axios.post(`${baseUrl}/loginUser`, dataToSubmit, config)
            if(data){
                localStorage.setItem('todoistUser', data.token)
                setIsSignedIn(true)
            }
            setLoading(false)

        } catch (error) {
            setError(error.response.data)
            setLoading(false)
        }
    }

    const getUser = async () => {
        try {
            let token =  localStorage.getItem('todoistUser')
            if(token){
                setToken(token)
            }

            const {data} = await axios.get(`${baseUrl}/getUser`)
            setUser(data)
        } catch (error) {
            setError(error.response.data)
        }
    }

    const logout =  () => {
        try {
            localStorage.removeItem('todoistUser')
            setIsSignedIn(false)
            setUser({})
        } catch (error) {
            setError(error.response.data)
        }
    }

    const addTask = async (task) => {
        try {
            const {data} = await axios.post(`${baseUrl}/createTodo`, task)
            if(data){
                setAdded(true)
            }
        } catch (error) {
            setError(error.response.data)
        }
    }

    const getTasks = async () => {
        try {
            let token =  localStorage.getItem('todoistUser')
            if(token){
                setToken(token)
            }
            const {data} = await axios.get(`${baseUrl}/getTodos`)
            if(data){
                setTodos(data.todos)
            }
        } catch (error) {
            setError(error.response.data)
        }
    }
    const getCompletedTasks = async () => {
        try {
            let token =  localStorage.getItem('todoistUser')
            if(token){
                setToken(token)
            }
            const {data} = await axios.get(`${baseUrl}/getCompletedTodos`)
            if(data){
                setTodos(data.todos)
            }
        } catch (error) {
            setError(error.response.data)
        }
    }
    const getUnCompletedTasks = async () => {
        try {
            let token =  localStorage.getItem('todoistUser')
            if(token){
                setToken(token)
            }
            const {data} = await axios.get(`${baseUrl}/getUnCompletedTodos`)
            if(data){
                setTodos(data.todos)
            }
        } catch ({error}) {
            setError(error.response.data)
        }
    }

    const mark = async (updatedValue) => {
        try {
            const {data} = await axios.put(`${baseUrl}/markAsCompleted`, updatedValue)
            if(data){
                setMarked(true)
            }
        } catch (error) {
            setError(error.response.data)
        }
    }

    const updateTask = async (updatedValue) => {
        try {
            const {data} = await axios.put(`${baseUrl}/update_task`, updatedValue)
            if(data){
                setAdded(true)
            }
        } catch (error) {
            setError(error.response.data)
        }
    }

    const deleteTask = async (todo_id) => {
        try {
            await axios.delete(`${baseUrl}/delete_todo/${todo_id}`)
            setTodos(todos.filter(todo => {
                return todo.todo_id !== todo_id
            }))
        } catch (error) {
            setError(error.response.data)
        }
    }
   
    return (
        <TodoContext.Provider
            value={{
                updateTodo,
                loading,
                isSignedIn,
                user,
                todos,
                added,
                marked,
                updateTodoId,
                error,
                setUpdateTodo,
                registerUser,
                loginUser,
                getUser,
                addTask,
                getTasks,
                logout,
                mark,
                getCompletedTasks,
                getUnCompletedTasks,
                deleteTask,
                updateTask,
                setUpdateTodoId

            }}
        
        >
            {props.children}
        </TodoContext.Provider>
    )
}