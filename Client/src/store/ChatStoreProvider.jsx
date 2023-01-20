import MessageAlert from '../components/MessageAlert/MessageAlert';
import React from 'react';
import { StoreContext } from './StoreProvider';
import { createContext } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRef } from 'react';
import { useState } from 'react';

export const ChatStoreContext = createContext(null)

const initUserObject = { name: '', id: -1 };
const initLastMessageArray = [{ name: '', id: -1, messageID: 0 }]

const ChatStoreProvider = ({ children }) => {

    const { io, user } = useContext(StoreContext)
    const { userID } = useParams()
    const [chatUser, setChatUser] = useState(initUserObject)
    const [messages, setMessages] = useState([])
    const [lastMessages, setLastMessages] = useState(initLastMessageArray)
    const [isTyping, setIsTyping] = useState(false)
    const chatUserRef = useRef()
    chatUserRef.current = chatUser

    const resetLastMessage = () => setLastMessages(prev => {
        const current = prev.slice(1)
        if (current.length === 1) return initLastMessageArray
        return current
    })

    const handleReciveMessage = (data, isCurrentChatUser) => {
        if (isCurrentChatUser) setMessages(prev => [...prev, data])
        else setLastMessages(prev => {
            const messageID = prev[prev.length - 1].messageID + 1
            const lastMessageObject = {
                ...data,
                messageID
            }
            return [...prev, lastMessageObject]
        })
    }

    useEffect(() => {
        io.on('getMessagesResponse', data => {
            setMessages(data)
        })

        io.on('updateTypingInfoResponse', data => {
            if (chatUserRef.current.id === data.from) {
                setIsTyping(data.typing)
            }
        })
    }, [])


    useEffect(() => {
        const messagesUsersIDs = [parseInt(user.id), parseInt(userID)]
        io.emit('getMessages', messagesUsersIDs)
        io.emit('getUsername', messagesUsersIDs[1])
        io.on('getUsernameResponse', data => {
            setChatUser(data)
        })
    }, [userID])


    const joinOnSend = (message) => {
        setMessages(prev => [...prev, message])
    }
    return (
        <ChatStoreContext.Provider value={{
            messages,
            lastMessages,
            chatUserRef,
            isTyping,
            resetLastMessage,
            joinOnSend,
            handleReciveMessage
        }}>
            {children}
        </ChatStoreContext.Provider>
    );
}

export default ChatStoreProvider;