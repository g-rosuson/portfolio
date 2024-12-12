type ThemeActionType = 'ui/change_theme';
type ColorSchemeActionType = 'ui/change_color_scheme';

type ActionType = ThemeActionType | ColorSchemeActionType;

export type {
    ColorSchemeActionType,
    ThemeActionType,
    ActionType
};