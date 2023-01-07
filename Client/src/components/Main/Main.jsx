import { Route, Routes } from 'react-router-dom';

import ChatStoreProvider from '../../store/ChatStoreProvider';
import ChatWindow from '../ChatWindow/ChatWindow';
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
        <div className={style()}>
            <Header />
            <Routes>
                <Route path='*' element={<NoChat />} />
                <Route exact path='/' element={<NoChat />} />
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/:userID' element={<ChatStoreProvider><ChatWindow /></ChatStoreProvider>} />
            </Routes>
        </div>
    );
}

export default Main;