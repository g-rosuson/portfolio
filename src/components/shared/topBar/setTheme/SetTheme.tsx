'use client';

import React, { useEffect, useState } from 'react';

import { Moon, Sun } from 'src/components/ui/icons/Icons';

import styling from './SetTheme.module.scss';

const SetTheme = () => {
    // State
    const [theme, setTheme] = useState(global.window?.__theme || 'dark');


    /**
     * Sets the theme in the window and local storage by invoking "__setPreferredTheme" & "setTheme".
     * Invokes "__onThemeChange" through "setTheme", which calls back and sets the component state
     * (src/lib/theme).
     */
    const toggleTheme = () => {
        const nextTheme = theme === 'dark' ? 'light' : 'dark';
        global.window?.__setPreferredTheme(nextTheme);
    };


    /**
     * Assigns the "setTheme" state setter to the "__onThemeChange"
     * callback function when the component mounts (src/lib/theme).
     */
    useEffect(() => {
        global.window.__onThemeChange = setTheme;
    }, []);


    // Determine UI based on active theme
    const isDarkThemeActive = theme === 'dark';

    const content = (
        <div className={styling.icon}>
            {isDarkThemeActive ? <Sun/> : <Moon/>}
        </div>
    );


    return (
        <button className={styling.button} onClick={toggleTheme}>
            {content}
        </button>
    );
};

export default SetTheme;