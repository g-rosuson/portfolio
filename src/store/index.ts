import { create } from 'zustand';

import { State } from './types';

import actions from './actions';
import { resources } from './dispatch';

const initialState = {
    ui: {
        theme: 'dark' as const,
        colorScheme: 'yellow' as const
    }
};

const useStore = create<State>()((set) => ({
    ...initialState,
    dispatch: (action) => set((state) => {
        const { domain, reducer } = resources(action.type);

        return {
            ...state,
            [domain]: reducer.action(action.payload, state[domain])
        };
    })
}));

export { useStore, actions };