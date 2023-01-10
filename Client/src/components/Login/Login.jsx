import { Navigate } from 'react-router-dom';
import React from 'react';
import { StoreContext } from '../../store/StoreProvider';
import bemCssModules from 'bem-css-modules'
import { default as loginStyles } from './Login.module.scss'
import { useContext } from 'react';
import { useState } from 'react';

const style = bemCssModules(loginStyles)

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
        <div className={style()}>
            <form onSubmit={handleSubmit} className={style('form')}>
                <label className={style('label')}>
                    <p className={style('title')}>Username</p>
                    <input
                        className={style('input')}
                        type="text"
                        value={formLogin}
                        onChange={handleFormLogin}
                    />
                </label>
                <label className={style('label')}>
                    <p className={style('title')}>Password</p>
                    <input
                        className={style('input')}
                        type="password"
                        value={formPassword}
                        onChange={handleFormPassword}
                    />
                </label>
                <label className={style('label')}>
                    <button type='submit' className={style('submit')}>Login</button>
                </label>
            </form>
            {user.logged && <Navigate to='/' />}
        </div>
    );
}

export default Login;