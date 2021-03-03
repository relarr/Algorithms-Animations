import React from 'react';

import './Button.css';

const Button = props => {
    return (
        <button 
            className={`button 
                ${props.reversed && 'button--reversed'}
                ${props.danger && 'button--danger'}
                ${props.disabled && 'button--disabled'}`}
            onClick={props.onClick}
            disabled={props.disabled}>
            {props.children}
        </button>
    );
};

export default Button;