import React from 'react'
import { createContext } from 'react';
import socket from 'socket.io-client'
import { useEffect } from 'react';
import { useState } from 'react';

export const StoreContext = createContext(null)

const io = socket('http://localhost:4000/');

const initUserState = {
    username: '',
    id: '',
    logged: false
}

const StoreProvider = ({ children }) => {
    const [user, setUser] = useState(initUserState)

    const [unreadMessages, setUnreadMessages] = useState([])
    const addUnreadMessage = data => setUnreadMessages(prev => [...prev, data])

    const deleteUnreadMessage = userID => {
        setUnreadMessages(prev => {
            const messages = prev.filter(message => message.from.id !== parseInt(userID));
            const data = {
                userID,
                messages
            }
            io.emit('deleteUnreadMessage', data)
            return messages
        })
    }
    const loginSucess = (data) => setUser(data)

    const logout = () => {
        setUser(initUserState)
        io.emit('logout')
    }


    io.on('getUnreadMessagesResponse', data => setUnreadMessages(data))

    return (
        <StoreContext.Provider value={{
            io,
            user,
            unreadMessages,
            deleteUnreadMessage,
            logout,
            addUnreadMessage,
            loginSucess
        }}>
            {children}
        </StoreContext.Provider>
    );
}

export default StoreProvider;