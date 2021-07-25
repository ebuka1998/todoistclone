import React from 'react'

const AddTask = ({showTextArea}) => {
    return (
        <div>
            <button className="text-red-500 mt-3 mb-6" onClick={showTextArea}>
                <i className="fa fa-plus font-semibold px-3" aria-hidden="true"></i>
                add task
            </button>
        </div>
    )
}

export default AddTask
