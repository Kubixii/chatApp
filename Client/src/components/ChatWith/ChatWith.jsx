import React from 'react'
import bemCssModules from 'bem-css-modules'
import { default as chatwithStyles } from './ChatWith.module.scss'

const style = bemCssModules(chatwithStyles)

const ChatWith = ({ user }) => {
    return (
        <div className={style()}>
            <p>Chat with user {user}</p>
        </div>
    );
}

export default ChatWith;