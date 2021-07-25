import React, { useContext, useEffect, useState } from 'react'
import RegisterLogin from '../components/RegisterLogin';
import { TodoContext } from '../context/todoContext';

const RegisterPage = (props) => {
    const {isSignedIn, registerUser, loading, error} = useContext(TodoContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const data = {
        email, 
        user_password: password
    }
    const register = (e) => {
        e.preventDefault()
        registerUser(data)
    }

    useEffect(() => {
        if(isSignedIn && isSignedIn) {
            props.history.push('/')
        }
    }, [isSignedIn, props])

    useEffect(() => {
        if(localStorage.getItem('todoistUser')) {
            props.history.push('/')
        }
    }, [props])
   
    return (
        <>
            <RegisterLogin
                text = "Register"
                valueText = {email}
                valuePassword = {password}
                buttonText= "register"
                onChangeText={(e) => setEmail(e.target.value)}
                onChangePassword={(e) => setPassword(e.target.value)}
                register_or_login={register}
                linkText="already registered? login"
                link="/login"
                loading={loading}
                error={error?.message}
            />

        </>
    )
}

export default RegisterPage
