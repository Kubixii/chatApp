import { ChatStoreContext } from '../../store/ChatStoreProvider';
import React from 'react';
import { StoreContext } from '../../store/StoreProvider';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const ChatTextForm = () => {
    const [chatText, setChatText] = useState('')
    const handleText = e => setChatText(e.target.value)
    const { userID } = useParams()
    const { io, user } = useContext(StoreContext)
    const { joinOnSend } = useContext(ChatStoreContext)

    const send = () => {
        const data = {
            from: user.id,
            to: parseInt(userID),
            text: chatText
        }
        joinOnSend(data)
        setChatText('')
        io.emit('sendMessage', data)
    }

    return (
        <div>
            <input
                type="text"
                value={chatText}
                onChange={handleText}
            />
            <button onClick={send}>Send</button>
        </div>
    );
}

export default ChatTextForm;