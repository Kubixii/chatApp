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

    const { messages, lastMessage, chatUser } = useContext(ChatStoreContext)

    useEffect(() => {
        const elements = messages.map((message, index) => {
            const isPrevMessageFromSameSender = index === 0 ? true : messages[index - 1].from === message.from
            return <Message
                key={index}
                text={message.text}
                isSentByCurrentUser={message.from === user.id}
                isPrevMessageFromSameSender={isPrevMessageFromSameSender}
            />
        })
        setMessagesElements(prev => {
            setTimeout(() => {
                const messagesWrapper = document.getElementsByClassName(messageStyle())
                if (prev.length === 0) messagesWrapper[messagesWrapper.length - 1].scrollIntoView()
                else messagesWrapper[messagesWrapper.length - 1].scrollIntoView({ behavior: 'smooth' })
            }, 1)
            return elements
        })
    }, [messages])

    return (
        <div className={style()}>
            {!user.logged && <Navigate to='/' />}
            <ChatWith user={chatUser} />
            <div className={style('messagesWrapper')}>
                <div className={style('messages')}>
                    {messagesElements}
                </div>
            </div>
            <ChatTextForm />
            <MessageAlert user={lastMessage} />
        </div>
    );
}

export default ChatWindow;