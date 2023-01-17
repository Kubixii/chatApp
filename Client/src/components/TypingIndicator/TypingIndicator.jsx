import React from 'react';
import bemCssModules from 'bem-css-modules'
import { default as typingindicatorStyles } from './TypingIndicator.module.scss'

const style = bemCssModules(typingindicatorStyles)

const TypingIndicator = ({ who }) => {
    return (
        <div className={style()}>
            <p>{who} is typing<span className={style('dots')}></span></p>
        </div>
    );
}

export default TypingIndicator;