import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { TodoContext } from '../context/todoContext';
import { withRouter } from 'react-router-dom';

const AppHeader = ({email_name, history}) => {
    const {logout} = useContext(TodoContext)
    const [navbarOpen, setNavbarOpen] = React.useState(false);
    const [dropDown, setDropDown] = React.useState(false);

    const logOut = () => {
        logout()
        history.push('/login')
    }
    return (
        <>
            <nav className="relative w-full flex flex-wrap items-center justify-between px-2 py-3 bg-pink-500 mb-3">
                <div className="container flex items-center justify-between">
                    <div className="flex justify-start">
                        <button
                            className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block outline-none focus:outline-none"
                            type="button"
                            onClick={() => setNavbarOpen(!navbarOpen)}
                        >
                            <i className="fas fa-bars"></i>
                        </button>
                        <Link
                        className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
                          to="/"
                        >
                            todoist clone
                        </Link>
                    </div>

                    <div>
                        <ul className="flex flex-row list-none">
                            <li className="nav-item mt-1.5">
                                <button onClick={() => setDropDown(!dropDown)}>
                                    <div className="flex h-8 w-8 px-2 py-2 rounded-full border items-center justify-center relative">
                                        <h3 className="font-medium text-sm">{email_name}</h3>
                                    </div>
                                </button>
                            </li>

                            {
                                dropDown ? (
                                    <div className="absolute right-0 mt-12 ml-6 py-2 w-48 bg-white rounded-md shadow-xl z-20">
                                        <button 
                                            className="block px-4 py-2 text-sm capitalize text-gray-700 w-full hover:text-red"
                                            onClick={logOut}
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                ) : null
                            }

                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default withRouter(AppHeader)
