import React from 'react'
import { StoreContext } from '../../store/StoreProvider';
import bemCssModules from 'bem-css-modules'
import { default as headerStyles } from './Header.module.scss'
import { useContext } from 'react';

const style = bemCssModules(headerStyles)

const Header = () => {

    const { user, logout } = useContext(StoreContext)

    return (
        <div className={style()}>
            <div className={style('currentUser')}>
                <p>Logged in as: <span className={style('usernameHighlight')}>{user.username}</span></p>
            </div>
            <div className={style('logoutElement')}>
                {user.logged && <button onClick={logout} className={style('logout')}>Logout</button>}
            </div>
        </div>
    );
}

export default Header;