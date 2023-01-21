import React, { useState } from 'react';

import bemCssModules from 'bem-css-modules'
import { default as typingindicatorStyles } from './TypingIndicator.module.scss'
import { useEffect } from 'react';

const style = bemCssModules(typingindicatorStyles)

const TypingIndicator = ({ who, isTyping }) => {

    const [show, setShow] = useState(isTyping)
    const cssClass = isTyping ? "slideIn" : "slideOut"

    useEffect(() => {
        if (isTyping) setShow(true)
    }, [isTyping])

    const handleAnimationEnd = () => {
        if (!isTyping) setShow(false)
    }

    return show && (
        <div className={style()}>
            <p
                className={`${style('text')} ${style(cssClass)}`}
                onAnimationEnd={handleAnimationEnd}
            >
                {who} is typing<span className={style('dots')} />
            </p>
        </div>
    );
}

export default TypingIndicator;