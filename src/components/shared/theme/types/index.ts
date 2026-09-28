import type { ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextValue {
    theme: Theme;
    toggleTheme: () => void;
}

interface Props {
    initialTheme?: Theme;
    children: ReactNode;
}

export type { Props, Theme, ThemeContextValue };
