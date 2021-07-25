import React from 'react'

const SortDropdown = ({sortCompleted, sortUnCompleted, getAll}) => {
    return (
        <div className="absolute mt-1 ml-6 py-2 w-48 bg-white rounded-md shadow-xl z-20">
            <button className="block px-4 py-2 text-sm capitalize text-gray-700  hover:text-black"
                onClick={getAll}
            >
                all
            </button>
            <button className="block px-4 py-2 text-sm capitalize text-gray-700  hover:text-black"
                onClick={sortUnCompleted}
            >
                not completed
            </button>
            <button className="block px-4 py-2 text-sm capitalize text-gray-700  hover:text-black"
                onClick={sortCompleted}
            >
                completed
            </button>
        </div>
    )
}

export default SortDropdown
