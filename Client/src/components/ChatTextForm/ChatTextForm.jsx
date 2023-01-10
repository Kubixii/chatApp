import { ChatStoreContext } from '../../store/ChatStoreProvider';
import React from 'react';
import { StoreContext } from '../../store/StoreProvider';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const ChatTextForm = () => {
    const [chatText, setChatText] = useState('')
    const [loading, setLoading] = useState(true)
    const handleText = e => setChatText(e.target.value)
    const { userID } = useParams()
    const { io, user } = useContext(StoreContext)
    const { joinOnSend, chatUser, isTyping } = useContext(ChatStoreContext)

    const send = (e) => {
        e.preventDefault()
        const data = {
            from: user.id,
            to: parseInt(userID),
            text: chatText
        }
        chatText !== '' && joinOnSend(data)
        setChatText('')
        io.emit('sendMessage', data)
    }

    useEffect(() => {
        if (!loading) {
            const data = {
                to: parseInt(userID),
                typing: true
            }
            io.emit('updateTypingInfo', data)
        }
        setLoading(false)
        const timer = setTimeout(() => {
            const data = {
                to: parseInt(userID),
                typing: false
            }
            io.emit('updateTypingInfo', data)
        }, 3000)
        return () => clearTimeout(timer)
    }, [chatText])

    return (
        <div>
            <form onSubmit={send}>
                <input
                    type="text"
                    value={chatText}
                    onChange={handleText}
                />
                <button type='submit'>Send</button>
            </form>
            <p>{isTyping && `${chatUser} is typing...`}</p>
        </div>
    );
}

export default ChatTextForm;