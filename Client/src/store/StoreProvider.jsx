import React from 'react'
import { createContext } from 'react';
import socket from 'socket.io-client'
import { useState } from 'react';

export const StoreContext = createContext(null)

const io = socket('http://localhost:4000/');

const initUserState = {
    username: '',
    roomName: '',
    id: '',
    logged: false
}

const StoreProvider = ({ children }) => {
    const [user, setUser] = useState(initUserState)

    const attemptLogin = (login, pass) => {
        io.emit('attemptLogin', { login, pass })
    }
    const logout = () => {
        setUser(initUserState)
        io.emit('logout')
    }

    io.on('loginResponse', data => {
        setUser(data.user)
    })

    return (
        <StoreContext.Provider value={{
            io,
            user,
            attemptLogin,
            logout
        }}>
            {children}
        </StoreContext.Provider>
    );
}

export default StoreProvider;