import { ColorSchemeActionType, ThemeActionType } from '../actions/types';

// Action and reducer domains
type Domain = 'ui'

// UI
type Theme = 'dark' | 'light';
type ColorScheme = 'purple' | 'yellow';

type UserInterface = {
    theme: Theme;
    colorScheme: ColorScheme;
};

// Dispatch actions
type ThemeDispatchAction = {
    type: ThemeActionType;
    payload: Theme;
}

type ColorSchemeDispatchAction = {
    type: ColorSchemeActionType;
    payload: ColorScheme;
}

type DispatchAction = ThemeDispatchAction | ColorSchemeDispatchAction;

// State
type State = {
    ui: UserInterface
    dispatch: (action: DispatchAction) => void
};

type PartialState = UserInterface

export type {
    DispatchAction,
    UserInterface,
    PartialState,
    ColorScheme,
    Domain,
    Theme,
    State
};