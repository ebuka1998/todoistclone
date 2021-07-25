import React from 'react'
import { Link } from 'react-router-dom'

const RegisterLogin = ({error, loading, link, linkText, text, buttonText, valueText, valuePassword, register_or_login, onChangeText, onChangePassword}) => {
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <form className="w-full md:w-1/3 bg-white rounded-lg">
                <div className="flex font-bold justify-center mt-6">
                    <img 
                        className="h-20 w-20"
                        src="https://raw.githubusercontent.com/sefyudem/Responsive-Login-Form/master/img/avatar.svg" 
                        alt="profile"
                    />
                </div>
                <h2 className="text-3xl text-center text-gray-700 mb-4">{text}</h2>
                <div className="px-12 pb-10">
                    <div className="w-full mb-2">
                        <div className="flex items-center">
                            <i className='ml-3 fill-current text-gray-400 text-xs z-10 fas fa-user'></i>
                            <input 
                                type='email' placeholder="email"
                                className="-mx-6 px-8  w-full border rounded px-3 py-2 text-gray-700 focus:outline-none" 
                                value={valueText}
                                onChange={onChangeText}
                            />
                        </div>
                    </div>
                    <div className="w-full mb-2">
                        <div className="flex items-center">
                            <i className='ml-3 fill-current text-gray-400 text-xs z-10 fas fa-lock'></i>
                            <input 
                                type='password' placeholder="Password"
                                className="-mx-6 px-8 w-full border rounded px-3 py-2 text-gray-700 focus:outline-none" 
                                value={valuePassword}
                                onChange={onChangePassword}
                            />
                        </div>
                    </div>
                    <Link to={link} className="text-xs text-gray-500 float-right mb-4">{linkText}</Link>
                    <div className="w-full mt-12 mb-3 flex justify-center">
                        <small className="text-red-500 text-lg ">{error ? error : ''}</small>
                    </div>
                    <button 
                        type="submit"
                        className="w-full py-2 rounded-full bg-green-600 text-gray-100 focus:outline-none"
                        onClick={register_or_login}
                    >
                        {loading ? 'laoding' : buttonText}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default RegisterLogin
