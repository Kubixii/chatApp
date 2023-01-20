import { ChatStoreContext } from '../../store/ChatStoreProvider'
import React from 'react'
import bemCssModules from 'bem-css-modules'
import { default as messagealertStyles } from './MessageAlert.module.scss'
import { useContext } from 'react'
import { useEffect } from 'react'

const style = bemCssModules(messagealertStyles)

const MessageAlert = ({ user, offset }) => {

    const { resetLastMessage } = useContext(ChatStoreContext)

    useEffect(() => {
        setTimeout(() => {
            resetLastMessage()
        }, 6000)
    }, [])
    return (
        <div className={style()}>
            <div className={style('alert')}>
                <p>user {user} sent a message</p>
            </div>
        </div>
    );
}

export default MessageAlert;