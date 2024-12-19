declare global {
    interface Window {
        __theme: string ;
        __onThemeChange: (theme: string) => void;
        __setPreferredTheme: (theme: string) => void;
    }
}

/**
 * IIFEThemeScript initializes and manages the application's theme system.
 *
 * This script performs the following functions:
 * 1. Initializes theme-related properties on the global `window` object:
 *    - `__theme`: Stores the current theme ("dark" or "light").
 *    - `__onThemeChange`: A callback invoked whenever the theme changes.
 *    - `__setPreferredTheme`: A method to change the theme and persist it.
 *
 * 2. Applies the persisted theme (if available) or the system's preferred color scheme
 *    when the script first runs.
 *
 * 3. Listens for changes in the system's color scheme (dark or light) and automatically
 *    updates the preferred theme accordingly.
 *
 * 4. Synchronizes the theme changes with other parts of the application using the
 *    `__onThemeChange` callback and persists the preferred theme in `localStorage`.
 */
const IIFEThemeScript = () => {
    // This function is assigned to the "setTheme" fn in the "SetTheme" component.
    // And when the component theme is toggled, the "__setPreferredTheme" is called.
    // Which through the "setTheme" fn below, invokes the "__onThemeChange", which
    // calls back and sets the component state
    window.__onThemeChange = () => {};

    // Holds the persisted or chosen theme
    let preferredTheme: string | null = null;

    // Sets the theme in the window object and updates the document's theme attribute.
    // And calls back and sets the theme in the "SetTheme" component
    const setTheme = (newTheme: string) => {
        window.__theme = newTheme;
        document.documentElement.dataset.theme = newTheme;

        window.__onThemeChange(newTheme);
    };

    // Set the preferred theme as the persisted one if defined,
    // when the script initially runs
    try {
        preferredTheme = localStorage.getItem('theme');
    } catch (error) {
        console.error(error);
    }

    // Calls the setTheme function which sets the theme in the window object
    // and updates the state/UI in the "SetTheme" component. And finally
    // persists the theme in localStorage
    window.__setPreferredTheme = (newTheme: string) => {
        setTheme(newTheme);

        try {
            localStorage.setItem('theme', newTheme);
        } catch (error) {
            console.error(error);
        }
    };

    // Listens for changes to the system's color scheme preference (dark or light).
    // And automatically updates the preferred theme using __setPreferredTheme
    // when the user's system preference change
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

    darkQuery.addEventListener('change', (event) => {
        window.__setPreferredTheme(event.matches ? 'dark' : 'light');
    });

    // Sets the theme when the script initially runs
    setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'));
};

export const getTheme = `(${IIFEThemeScript})();`;