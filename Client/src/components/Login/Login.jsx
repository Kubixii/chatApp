import { Navigate } from 'react-router-dom';
import React from 'react';
import { StoreContext } from '../../store/StoreProvider';
import { useContext } from 'react';
import { useState } from 'react';

const Login = () => {
    const [formLogin, setFormLogin] = useState('')
    const [formPassword, setFormPassword] = useState('')
    const handleFormLogin = e => setFormLogin(e.target.value)
    const handleFormPassword = e => setFormPassword(e.target.value)
    const { attemptLogin } = useContext(StoreContext)
    const { user } = useContext(StoreContext)
    const handleSubmit = e => {
        e.preventDefault()

        attemptLogin(formLogin, formPassword)
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input
                        type="text"
                        value={formLogin}
                        onChange={handleFormLogin}
                    />
                </label>
                <label>
                    <p>Password</p>
                    <input
                        type="password"
                        value={formPassword}
                        onChange={handleFormPassword}
                    />
                </label>
                <label>
                    <button type='submit'>Login</button>
                </label>
            </form>
            {user.logged && <Navigate to='/' />}
        </>
    );
}

export default Login;