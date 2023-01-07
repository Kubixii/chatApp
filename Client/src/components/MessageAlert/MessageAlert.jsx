import { ChatStoreContext } from '../../store/ChatStoreProvider'
import React from 'react'
import bemCssModules from 'bem-css-modules'
import { default as messagealertStyles } from './MessageAlert.module.scss'
import { useContext } from 'react'
import { useEffect } from 'react'

const style = bemCssModules(messagealertStyles)

const MessageAlert = ({ user }) => {

    const { clearLastMessage } = useContext(ChatStoreContext)

    useEffect(() => {
        setTimeout(() => clearLastMessage(), 15000)
    })

    return user === '' ? null : (
        <div className={style()}>
            <p>user {user} sent a message</p>
        </div>
    );
}

export default MessageAlert;