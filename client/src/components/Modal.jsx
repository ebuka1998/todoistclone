import React from 'react'

const Modal = ({text, change, toggleOff, updateTask}) => {
    return (
       
       <div className="flex justify-center items-center mt-24">
            <div  tabIndex="0" className="z-40 overflow-auto lg:w-1/2 w-full h-full fixed">
            <div   className="z-50 relative p-3 mx-auto my-0 max-w-full">
                <div className="bg-white rounded shadow-lg border flex flex-col overflow-hidden">
                    <button 
                        className="fill-current h-6 w-6 absolute right-0 top-0 m-6 font-3xl font-bold"
                        onClick={toggleOff}
                    >
                        &times;
                    </button>
                    <div className="p-6 flex-grow">
                        <input type='text' 
                            placeholder="Enter your input here" 
                            className="w-full mt-2 mb-6 px-4 py-2 border rounded-lg
                            text-gray-700 focus:outline-none focus:border-green-500" 
                            value={text}
                            onChange={change}
                        />
                        <div>
                            <button 
                                className="bg-red-700 text-gray-100 rounded px-4 py-2 mr-1"
                                onClick={updateTask}
                            >
                                update task
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="z-40 overflow-auto left-0 top-0 bottom-0 right-0 w-full h-full fixed bg-black opacity-50"></div>
            </div>
       </div>
 
    )
}

export default Modal
