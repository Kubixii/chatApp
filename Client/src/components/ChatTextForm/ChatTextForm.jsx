import { ChatStoreContext } from '../../store/ChatStoreProvider';
import React from 'react';
import { StoreContext } from '../../store/StoreProvider';
import TypingIndicator from '../TypingIndicator/TypingIndicator';
import bemCssModules from 'bem-css-modules'
import { default as chattextformStyles } from './ChatTextForm.module.scss'
import sendIcon from './assets/send.png'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const style = bemCssModules(chattextformStyles)

const ChatTextForm = () => {
    const [chatText, setChatText] = useState('')
    const handleText = e => setChatText(e.target.value)
    const { io, user } = useContext(StoreContext)
    const { userID, joinOnSend, chatUser, isTyping } = useContext(ChatStoreContext)
    useEffect(() => {
        setChatText('')
    }, [userID])
    const send = (e) => {
        e.preventDefault()
        if (chatText === '') return null
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
        let timer
        if (chatText === '') return () => clearTimeout(timer)
        else {
            const data = {
                from: user.id,
                to: parseInt(userID),
                typing: true
            }
            io.emit('updateTypingInfo', data)
        }
        timer = setTimeout(() => {
            const data = {
                from: user.id,
                to: parseInt(userID),
                typing: false
            }
            io.emit('updateTypingInfo', data)
        }, 3000)
        return () => clearTimeout(timer)
    }, [chatText])

    return (
        <div className={style()}>
            <form onSubmit={send} className={style('messageForm')}>
                <input
                    type="text"
                    value={chatText}
                    onChange={handleText}
                    className={style('textMessage')}
                />
                <button
                    type='submit'
                    className={style('sendButton')}
                >
                    <img src={sendIcon} alt="send" />
                </button>
            </form>
            {isTyping && <TypingIndicator who={chatUser} />}
        </div>
    );
}

export default ChatTextForm;