import { ColorSchemeActionType, ThemeActionType } from '../actions/types';

// User interface
type Theme = 'dark' | 'light';
type ColorScheme = 'purple' | 'yellow';

type UserInterface = {
    theme: Theme;
    colorScheme: ColorScheme;
};

// Dispatch actions
type DispatchAction<T, P> = {
    type: T;
    payload: P;
};

// // User interface
type ThemeDispatchAction = DispatchAction<ThemeActionType, Theme>;
type ColorSchemeDispatchAction = DispatchAction<ColorSchemeActionType, ColorScheme>;
type UserInterfaceDispatchAction = ThemeDispatchAction | ColorSchemeDispatchAction;

type Action = UserInterfaceDispatchAction;

// State
type State = {
    ui: UserInterface;
    dispatch: (action: Action) => void;
};

export type {
    DispatchAction,
    UserInterface,
    ColorScheme,
    Theme,
    State
};
