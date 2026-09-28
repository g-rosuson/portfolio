'use client';

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import helpers from './helpers';

import type { Props, Theme, ThemeContextValue } from './types';

const ThemeContext = createContext<ThemeContextValue | null>(null);

const ThemeProvider = ({ initialTheme, children }: Props) => {
    const [theme, setTheme] = useState<Theme>(initialTheme ?? 'dark');

    useEffect(() => {
        if (initialTheme) {
            return;
        }

        const next = helpers.readClientTheme();

        setTheme(next);

        if (next !== document.documentElement.dataset.theme) {
            helpers.persistTheme(next);
        }
    }, [initialTheme]);

    const toggleTheme = useCallback(() => {
        const next: Theme = theme === 'dark' ? 'light' : 'dark';

        helpers.persistTheme(next);
        setTheme(next);
    }, [theme]);

    const value = useMemo(() => {
        return { theme, toggleTheme };
    }, [theme, toggleTheme]);

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const value = useContext(ThemeContext);

    if (!value) {
        throw new Error('useTheme must be used within ThemeProvider');
    }

    return value;
};

export default ThemeProvider;
