import React, { useContext, useEffect, useState } from 'react'
import RegisterLogin from '../components/RegisterLogin';
import { TodoContext } from '../context/todoContext';

const LoginPage = (props) => {
    const {isSignedIn, loginUser, loading, error} = useContext(TodoContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const data = {
        email, 
        user_password: password
    }

    const login = (e) => {
        e.preventDefault()
        loginUser(data)
        if(isSignedIn) props.history.push('/')
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
                text = "Login"
                valueText = {email}
                valuePassword = {password}
                buttonText= "login"
                onChangeText={(e) => setEmail(e.target.value)}
                onChangePassword={(e) => setPassword(e.target.value)}
                register_or_login={login}
                linkText="don't have an account? register"
                link="/register"
                loading={loading}
                error={error?.message}
            />
        </>
    )
}

export default LoginPage
