import { Domain } from '../../types';
import { ColorSchemeActionType, ThemeActionType } from '../types';

// Action domain
const domain: Domain = 'ui';

// Actions
const changeTheme: ThemeActionType = `${domain}/change_theme`;
const changeColorScheme: ColorSchemeActionType = `${domain}/change_color_scheme`;

const UIActions = {
    changeColorScheme,
    changeTheme
};

export default UIActions;