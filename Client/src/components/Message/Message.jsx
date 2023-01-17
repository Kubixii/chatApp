import React from 'react'
import bemCssModules from 'bem-css-modules'
import { default as messageStyles } from './Message.module.scss'

const style = bemCssModules(messageStyles)

const Message = ({
    text = '',
    isSentByCurrentUser = false,
    isPrevMessageFromSameSender = false
}) => {

    const messageAlignment = isSentByCurrentUser ? {
        display: 'flex',
        alignSelf: 'flex-end',
        backgroundColor: 'darkblue',
        borderRadius: !isPrevMessageFromSameSender ? '1em 0.4em 1em 1em' : '1em 0.4em 0.4em 1em',
    } :
        {
            display: 'flex',
            alignSelf: 'flex-start',
            backgroundColor: 'darkgreen',
            borderRadius: !isPrevMessageFromSameSender ? '0.4em 1em 1em 1em' : '0.4em 1em 1em 0.4em'
        }

    return (
        <div className={style()} style={messageAlignment}>
            <p>{text}</p>
        </div>
    );
}

export default Message;