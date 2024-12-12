import { ColorScheme, Theme, UserInterface } from 'src/store/types';

const changeTheme = {
    type: 'change_theme',
    action: (payload: Theme, state: UserInterface) => ({
        ...state,
        theme: payload
    })
};

const changeColorScheme = {
    type: 'change_color_scheme',
    action: (payload: ColorScheme, state: UserInterface) => ({
        ...state,
        colorScheme: payload
    })
};

const reducers = [
    changeColorScheme,
    changeTheme
];

export default reducers;