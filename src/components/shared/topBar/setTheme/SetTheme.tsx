'use client';

import React from 'react';

import { useTheme } from 'src/components/shared/theme/ThemeProvider';
import { Moon, Sun } from 'src/components/ui/icons/Icons';

import styling from './SetTheme.module.scss';

const SetTheme = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button className={styling.button} onClick={toggleTheme}>
            <div className={styling.icon}>
                {theme === 'dark' ? <Sun/> : <Moon/>}
            </div>
        </button>
    );
};

export default SetTheme;
