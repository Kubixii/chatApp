import { useRef, useState } from 'react'

import React from 'react'
import bemCssModules from 'bem-css-modules'
import { default as chatmessageinputStyles } from './ChatMessageInput.module.scss'
import { useEffect } from 'react'

const style = bemCssModules(chatmessageinputStyles)

const ChatMessageInput = ({ value, onChange, formRef, className }) => {

    const handleInput = () => {
        onChange(document.getElementsByClassName(`${className}`)[0].textContent)
    }
    const inputRef = useRef()
    useEffect(() => {
        inputRef.current = document.getElementsByClassName(`${className}`)[0]
        const keyDownHandler = e => {
            if (e.key === 'Enter') {
                e.preventDefault()
                formRef.current.dispatchEvent(
                    new Event("submit", { bubbles: true, cancelable: true })
                )
            }
        };
        inputRef.current.addEventListener('keydown', keyDownHandler);

        return () => inputRef.current.removeEventListener('keydown', keyDownHandler);
    }, [])

    useEffect(() => {
        inputRef.current.textContent = value
    }, [value])
    return (
        <div className={style()}>
            <div className={`${className}`} contentEditable onInput={handleInput}>
            </div>
        </div>
    );
}

export default ChatMessageInput;