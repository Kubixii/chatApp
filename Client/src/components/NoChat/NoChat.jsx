import { Navigate } from 'react-router-dom';
import React from 'react';
import { StoreContext } from '../../store/StoreProvider';
import bemCssModules from 'bem-css-modules'
import { default as nochatStyles } from './NoChat.module.scss'
import { useContext } from 'react';

const style = bemCssModules(nochatStyles)

const NoChat = () => {
    const { user } = useContext(StoreContext)

    return (
        <div className={style()}>
            {!user.logged && <Navigate to='/login' />}
            <p className={style('info')}>Select users from the users list to start chatting</p>
        </div>
    );
}

export default NoChat;