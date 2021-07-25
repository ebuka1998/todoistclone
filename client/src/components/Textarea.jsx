import React from 'react'

const Textarea = ({textValue, changeText, addTask, text}) => {
    return (
        <div className="mt-3">
            <textarea 
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none" 
                value={textValue}
                onChange={changeText}
                rows="3" placeholder="enter a task"></textarea>
            <button 
                className={
                    text.length === 0 ? "bg-pink-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50":
                    "bg-pink-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded "
                } 
                onClick={addTask}
                disabled={text.length === 0 ? true : false}
            >
                add task
            </button>
        </div>
    )
}

export default Textarea
