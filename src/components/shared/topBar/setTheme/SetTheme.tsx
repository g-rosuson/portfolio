'use client';

import React, { useEffect, useState } from 'react';

import { Moon, Sun } from 'src/components/ui/icons/Icons';

import styling from './SetTheme.module.scss';

/**
 * SetTheme Component
 *
 * This React component provides a toggle button to switch between light and dark themes.
 *
 * Key Features:
 * 1. Uses a state variable (`theme`) to track the current theme.
 *    - Initially, it checks the `window.__theme` property or defaults to "dark".
 *
 * 2. Toggles the theme between "light" and "dark" when the button is clicked.
 *    - Calls `window.__setPreferredTheme` to update the theme globally and persist it.
 *
 * 3. Syncs with global theme changes:
 *    - Registers a callback with `window.__onThemeChange` to update the component's state
 *      whenever the theme changes externally (e.g., via system preferences).
 *
 * Usage:
 * - Renders a button that displays the current theme ("dark" or "light").
 * - Clicking the button toggles the theme and updates the UI accordingly.
 */
const SetTheme = () => {
    // State
    const [theme, setTheme] = useState(global.window?.__theme || 'dark');


    /**
     * Sets the theme in the window and local storage by invoking "__setPreferredTheme" & "setTheme".
     * Invokes "__onThemeChange" through "setTheme", which sets the local state. (src/lib/theme)
     */
    const toggleTheme = () => {
        const nextTheme = theme === 'dark' ? 'light' : 'dark';
        global.window?.__setPreferredTheme(nextTheme);
    };


    /**
     * Assigns the "setTheme" state setter to the "__onThemeChange"
     * callback function, when the component mounts (src/lib/theme).
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