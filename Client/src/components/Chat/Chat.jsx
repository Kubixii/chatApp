import { ChatStoreContext } from '../../store/ChatStoreProvider';
import ChatWindow from '../ChatWindow/ChatWindow';
import ChatWith from '../ChatWith/ChatWith';
import MessageAlert from '../MessageAlert/MessageAlert';
import { Navigate } from 'react-router-dom';
import React from 'react';
import { StoreContext } from '../../store/StoreProvider';
import { useContext } from 'react';
import { useEffect } from 'react';

const Chat = () => {
    const { user, io } = useContext(StoreContext)
    const { chatUserRef, handleReciveMessage, lastMessages } = useContext(ChatStoreContext)

    const test = data => {
        if (data.from.id === chatUserRef.current.id) {
            handleReciveMessage(data, true)
        }
        else {
            handleReciveMessage(data, false)
        }
    }

    useEffect(() => {
        io.on('reciveMessage', data => test(data))
    }, [])

    const messageAlertElements = lastMessages.map(lastMessage => {
        return parseInt(lastMessage.id) === parseInt(-1) ? null : <MessageAlert key={lastMessage.messageID} user={lastMessage.from.name} offset={lastMessage.messageID} />
    })
    return (
        <div>
            {!user.logged && <Navigate to='/' />}
            <ChatWith user={chatUserRef.current.name} />
            <ChatWindow />
            {messageAlertElements}
        </div>
    );
}

export default Chat;