import ChatMessageInput from '../ChatMessageInput/ChatMessageInput';
import { ChatStoreContext } from '../../store/ChatStoreProvider';
import React from 'react';
import { StoreContext } from '../../store/StoreProvider';
import TypingIndicator from '../TypingIndicator/TypingIndicator';
import bemCssModules from 'bem-css-modules'
import { default as chattextformStyles } from './ChatTextForm.module.scss'
import sendIcon from './assets/send.png'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';

const style = bemCssModules(chattextformStyles)

const ChatTextForm = () => {
    const [chatText, setChatText] = useState(null)
    const handleText = e => setChatText(e)

    const { io, user } = useContext(StoreContext)
    const { joinOnSend, chatUserRef, isTyping } = useContext(ChatStoreContext)
    const formRef = useRef()

    useEffect(() => {
        setChatText(null)
    }, [chatUserRef.current])

    const send = (e) => {
        e.preventDefault()
        if (chatText === '' || chatText.replace(/\s/g, '').length === 0) return null
        const data = {
            from: {
                name: user.username,
                id: user.id
            },
            to: {
                name: chatUserRef.current.name,
                id: chatUserRef.current.id
            },
            text: chatText
        }
        chatText !== null && joinOnSend(data)
        setChatText(null)
        io.emit('sendMessage', data)
    }

    useEffect(() => {
        let timer
        if (chatText === null) return () => clearTimeout(timer)
        else {
            const data = {
                from: user.id,
                to: parseInt(chatUserRef.current.id),
                typing: true
            }
            io.emit('updateTypingInfo', data)
        }
        timer = setTimeout(() => {
            const data = {
                from: user.id,
                to: parseInt(chatUserRef.current.id),
                typing: false
            }
            io.emit('updateTypingInfo', data)
        }, 2000)
        return () => clearTimeout(timer)
    }, [chatText])

    return (
        <div className={style()}>
            <form onSubmit={send} className={style('messageForm')} ref={formRef}>
                <ChatMessageInput
                    value={chatText}
                    onChange={handleText}
                    formRef={formRef}
                    className={style('textMessage')}
                />
                <button
                    type='submit'
                    className={style('sendButton')}
                >
                    <img src={sendIcon} alt="send" />
                </button>
            </form>
            <TypingIndicator who={chatUserRef.current.name} isTyping={isTyping} />
        </div>
    );
}

export default ChatTextForm;