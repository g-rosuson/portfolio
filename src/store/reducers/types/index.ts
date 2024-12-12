import { ColorScheme, PartialState, Theme } from 'src/store/types';

type ReducerType = 'change_theme' | 'change_color_scheme';
type ActionPayload = Theme | ColorScheme;

type Reducer = {
    type: ReducerType;
    action: (payload: ActionPayload, state: PartialState) => PartialState
}

export type {
    Reducer
};