import React from 'react'
import bemCssModules from 'bem-css-modules'
import { default as messageStyles } from './Message.module.scss'

const style = bemCssModules(messageStyles)

const Message = ({
    text = '',
    isSentByCurrentUser = false
}) => {

    const messageAlignment = isSentByCurrentUser ? {
        display: 'flex',
        alignSelf: 'flex-end'
    } :
        {
            display: 'flex',
            alignSelf: 'flex-start'
        }
    return (
        <div className={style()} style={messageAlignment}>
            <p>{text}</p>
        </div>
    );
}

export default Message;