import React, { useState } from 'react';

import { VerticalDots } from 'src/components/ui/icons/Icons';

import styling from './PopupMenu.module.scss';

const PopupMenu = () => {
    // State
    const [isOpen, setIsOpen] = useState(false);
    const clickHandler = () => {
        setIsOpen(prevState => !prevState);
    };


    return (
        <button
            className={styling.menu}
            tabIndex={1}
            aria-haspopup="true"
            aria-expanded={isOpen}
            onClick={clickHandler}
        >
            <div className={styling.icon}>
                <VerticalDots thick/>
            </div>
        </button>
    );
};

export default PopupMenu;