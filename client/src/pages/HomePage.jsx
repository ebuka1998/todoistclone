/* eslint-disable no-lone-blocks */
import React, {useContext, useEffect, useState} from 'react'
import AppHeader from '../components/AppHeader';
//import SideBar from '../components/SideBar';
import moment from 'moment'
import Modal from '../components/Modal';
import { TodoContext } from '../context/todoContext';
import SingleTodo from '../components/SingleTodo';
import SortDropdown from '../components/SortDropdown';
import AddTask from '../components/AddTask';
import Textarea from '../components/Textarea';

const HomePage = () => {
    const {
        updateTodo, 
        setUpdateTodo, 
        getUser, 
        user, 
        getTasks, 
        addTask, 
        todos, 
        added, 
        mark, 
        marked,
        getCompletedTasks,
        getUnCompletedTasks,
        deleteTask,
        deleted,
        updateTask,
        updateTodoId,
        setUpdateTodoId
    
    } = useContext(TodoContext)
    const [dropDown, setDropDown] = useState(false);
    const [showTextarea, setShowTextarea] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const [textTodo, setTextTodo] = useState('')
  
    var today = new Date();
    
    const toggle = (text, id) => {
        setShowModal(!showModal) 
        setUpdateTodo(text)
        setUpdateTodoId(id)
    }

    useEffect(() => {
        getUser()
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        getTasks()
        //eslint-disable-next-line
    }, [added, marked, deleted])

    const addTodo = () => {
        addTask({
            todo: textTodo,
            todo_creator: user && user?.user_id
        })
        setTextTodo('')
    }

    const updateATask = () => {
        updateTask({
            todo: updateTodo,
            todo_id: updateTodoId
        })

        setUpdateTodo('')
        setShowModal(!showModal) 
    }

    const markTodo = (text) => {
        mark({todo_id: text})
    }

    const sortCompleted = () => getCompletedTasks()
    const sortUnCompleted = () => getUnCompletedTasks()

    const del = (id) => {
        console.log(id);
        deleteTask(id)
    }



    return (
        <div>
            <AppHeader
                email_name={user && user.email?.substring(0,2).toUpperCase()}
            
            />
            {/* <SideBar/> */}

            <div className="container mx-auto lg:px-72 px-8">
                <div className="flex justify-between lg:mt-12">
                    <div className="flex flex-row">
                        <h1 className="text-3xl">Today</h1>
                        <small className="mt-4 pl-1">{moment(today).format("ddd, MMM Do")}</small>
                    </div>
                    <div>
                        <button onClick={() => setDropDown(!dropDown)}>
                            <i className="fa fa-long-arrow-up text-lg font-light" aria-hidden="true"></i>
                            <i className="fa fa-long-arrow-down text-lg font-light" aria-hidden="true"></i>
                            <span className="pl-1">sort</span>
                        </button>

                        {dropDown ? 
                        <SortDropdown 
                            sortCompleted={sortCompleted} 
                            sortUnCompleted={sortUnCompleted}
                            getAll={() => getTasks()}
                        
                        /> : 
                            null
                        }
                    </div>
                </div>

                {
                    todos && todos.length === 0 ? (
                        <h1 className="flex justify-center mt-12 text-4xl">No tasks yet</h1>
                    ): (
                         todos && todos.map(todo => (
                            <SingleTodo
                                key={todo.todo_id}
                                text={todo.todo}
                                toggle={() => toggle(todo.todo, todo.todo_id)}
                                delete_task={() => del(todo.todo_id)}
                                check={() => markTodo(todo.todo_id)}
                                val={todo.iscompleted}
                                isCompleted={todo.iscompleted}
                            />
                        ))
                    )
                }
  
                { showTextarea ? '' : <AddTask showTextArea={() => setShowTextarea(!showTextarea)}/> }
                
                {
                    showTextarea ? (
                       <Textarea
                        textValue={textTodo}
                        changeText={(e) => setTextTodo(e.target.value)}
                        addTask={addTodo}
                        text={textTodo}
                       />
                    ): null
                }
              
            </div>
            {
                showModal ? (
                    <Modal 
                        text={updateTodo} 
                        change={(e) => setUpdateTodo(e.target.value)}
                        toggleOff={() => setShowModal(false)}
                        updateTask={updateATask}
                    />
                ) : null
            }
            
        </div>
    )
}

export default HomePage
