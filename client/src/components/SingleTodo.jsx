import React from 'react'


const SingleTodo = ({text, toggle, check, val, isCompleted, delete_task}) => {
    return (
        <>
           <div className="flex justify-between mt-4 w-full">
                <div className="flex flex-start">
                    <div className="round py-0.5">
                        <input type="checkbox" id="checkbox" 
                            onChange={check} 
                            value={val} 
                            checked={val === true ? true : false}
                        />
                        <label htmlFor="checkbox"></label>
                    </div>
                    
                    <div className="pl-3 py-0  pb-6 cursor-pointer">
                        <small 
                            className={isCompleted === true ? "line-through font-medium text-lg" 
                                : "font-medium text-lg"
                        
                        }
                        
                        >
                            {text.length > 100 ? text.substring(0, ) + '...' : text}
                        </small>
                    </div>
                </div>

                <div className="flex">
                    {isCompleted ? '' : (
                        <button onClick={toggle} type="button">
                         <i className="fa fa-pencil font-light" aria-hidden="true"></i>
                        </button>
                    )}
                    <button onClick={delete_task} type="button">
                        <i className="fa fa-trash ml-2 font-light text-red-600" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
            <hr />  
        </>
    )
}

export default SingleTodo
