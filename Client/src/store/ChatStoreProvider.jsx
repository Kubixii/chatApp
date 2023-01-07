import React from 'react';
import { StoreContext } from './StoreProvider';
import { createContext } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

export const ChatStoreContext = createContext(null)

const ChatStoreProvider = ({ children }) => {

    const { io, user } = useContext(StoreContext)
    const { userID } = useParams()
    const [messages, setMessages] = useState([])
    const [lastMessage, setLastMessage] = useState('')
    const clearLastMessage = () => setLastMessage('')

    useEffect(() => {
        io.on('reciveMessage', data => {
            if (data.from === parseInt(userID)) setMessages(prev => [...prev, data])
            else setLastMessage(data.from)
        })

        io.on('getMessagesResponse', data => {
            setMessages(data)
        })

    }, [])

    useEffect(() => {
        const messagesUsersIDs = [parseInt(user.id), parseInt(userID)]
        io.emit('getMessages', messagesUsersIDs)
    }, [userID])


    const joinOnSend = (message) => {
        setMessages(prev => [...prev, message])
    }

    return (
        <ChatStoreContext.Provider value={{
            messages,
            lastMessage,
            clearLastMessage,
            joinOnSend
        }}>
            {children}
        </ChatStoreContext.Provider>
    );
}

export default ChatStoreProvider;