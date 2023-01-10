import { Navigate, useParams } from 'react-router-dom';

import { ChatStoreContext } from '../../store/ChatStoreProvider';
import ChatTextForm from '../ChatTextForm/ChatTextForm';
import Message from '../Message/Message';
import MessageAlert from '../MessageAlert/MessageAlert';
import React from 'react'
import { StoreContext } from '../../store/StoreProvider';
import bemCssModules from 'bem-css-modules'
import { default as chatwindowStyles } from './ChatWindow.module.scss'
import { useContext } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';

const style = bemCssModules(chatwindowStyles)

const ChatWindow = () => {

    const { user } = useContext(StoreContext)

    const [messagesElements, setMessagesElements] = useState([])

    const { messages, lastMessage, chatUser } = useContext(ChatStoreContext)

    useMemo(() => {
        const elements = messages.map((message, index) => {
            return <Message key={index} text={message.text} isSentByCurrentUser={message.from === user.id} />
        })
        setMessagesElements(elements)
    }, [messages])

    return (
        <div className={style()}>
            {!user.logged && <Navigate to='/' />}
            <p>{chatUser}</p>
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