import { Navigate, useParams } from 'react-router-dom';

import { ChatStoreContext } from '../../store/ChatStoreProvider';
import ChatTextForm from '../ChatTextForm/ChatTextForm';
import ChatWith from '../ChatWith/ChatWith';
import Message from '../Message/Message';
import MessageAlert from '../MessageAlert/MessageAlert';
import React from 'react'
import { StoreContext } from '../../store/StoreProvider';
import bemCssModules from 'bem-css-modules'
import { default as chatwindowStyles } from './ChatWindow.module.scss'
import { default as messageStyles } from '../Message/Message.module.scss'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const style = bemCssModules(chatwindowStyles)
const messageStyle = bemCssModules(messageStyles)

const ChatWindow = () => {

    const { user } = useContext(StoreContext)

    const [messagesElements, setMessagesElements] = useState([])

    const { messages } = useContext(ChatStoreContext)

    useEffect(() => {

        window.addEventListener('resize', handleWindowResize)

        const elements = messages.map((message, index) => {
            const isPrevMessageFromSameSender = index === 0 ? true : messages[index - 1].from === message.from.id
            return <Message
                key={index}
                text={message.text}
                isSentByCurrentUser={message.from.id === user.id}
                isPrevMessageFromSameSender={isPrevMessageFromSameSender}
            />
        })
        setMessagesElements(prev => {
            setTimeout(() => scrollToLastMessage(prev, false), 1)
            return elements
        })

        return () => window.removeEventListener('resize', handleWindowResize)
    }, [messages])

    const handleWindowResize = () => {
        scrollToLastMessage(messages, true)
    }

    const scrollToLastMessage = (messages, isOnResize) => {
        const messagesWrapper = document.getElementsByClassName(messageStyle())
        if (messages.length === 0 || isOnResize) { messagesWrapper[messagesWrapper.length - 1].scrollIntoView() }
        else messagesWrapper[messagesWrapper.length - 1].scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div className={style()}>
            <div className={style('messagesWrapper')}>
                <div className={style('messages')}>
                    {messagesElements}
                </div>
            </div>
            <ChatTextForm />
        </div>
    );
}

export default ChatWindow;