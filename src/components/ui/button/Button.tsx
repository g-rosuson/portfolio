import React from 'react';

import styling from './Button.module.scss';

interface Props {
    type?: 'button' | 'submit' | 'reset';
    label: string;
    ariaLabel: string;
    onClick?: () => void;
}

const Button = ({ type = 'button', label, ariaLabel, onClick }: Props) => {
    return (
        <button type={type} aria-label={ariaLabel} className={styling.button} onClick={onClick}>
            {label}
        </button>
    );
};

export default Button;