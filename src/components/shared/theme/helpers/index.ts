import type { Theme } from '../types';

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

/**
 * Returns whether a value is a supported theme.
 */
const isTheme = (value: string | null | undefined): value is Theme => {
    return value === 'light' || value === 'dark';
};

/**
 * Writes the theme to the document, localStorage, and a cookie for the next SSR pass.
 */
const persistTheme = (theme: Theme) => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
    document.cookie = `theme=${theme}; path=/; max-age=${ONE_YEAR_SECONDS}; samesite=lax`;
};

/**
 * Resolves the active theme from the document, localStorage, or the OS preference.
 */
const readClientTheme = (): Theme => {
    const attr = document.documentElement.dataset.theme;

    if (isTheme(attr)) {
        return attr;
    }

    try {
        const stored = localStorage.getItem('theme');

        if (isTheme(stored)) {
            return stored;
        }
    } catch {
        // Ignore unavailable storage
    }

    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }

    return 'light';
};

const helpers = {
    isTheme,
    persistTheme,
    readClientTheme
};

export default helpers;
