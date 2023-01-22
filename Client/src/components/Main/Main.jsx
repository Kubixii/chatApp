import { Route, Routes } from 'react-router-dom';

import ActiveUsersList from '../ActiveUsersList/ActiveUsersList';
import Chat from '../Chat/Chat';
import ChatStoreProvider from '../../store/ChatStoreProvider';
import Header from '../Header/Header';
import Login from '../Login/Login';
import NoChat from '../NoChat/NoChat'
import React from 'react';
import { StoreContext } from '../../store/StoreProvider';
import bemCssModules from 'bem-css-modules'
import { default as mainStyles } from './Main.module.scss'
import { useContext } from 'react';

const style = bemCssModules(mainStyles)

const Main = () => {
    const { user } = useContext(StoreContext)

    return (
        <>
            <ActiveUsersList />
            <div className={style()}>
                <Header />
                <Routes>
                    <Route path='*' element={<NoChat />} />
                    <Route exact path='/' element={<NoChat />} />
                    <Route exact path='/login' element={<Login />} />
                    <Route exact path='/:userID' element={<ChatStoreProvider><Chat /></ChatStoreProvider>} />
                </Routes>
            </div>
        </>
    );
}

export default Main;