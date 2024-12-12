import { ActionType } from '../actions/types';
import { Reducer } from '../reducers/types';

import reducerModules from '../reducers';

/**
 * Retrieves the domain and reducer from the action type.
 */
export const resources = (actionType: ActionType) => {
    // Retrieve domain and reducer reference from the action-type
    const resources = actionType.split('/');

    const [domain, reducerName] = resources;

    // Validate and retrieve the domain module
    const domainModule = reducerModules[domain];

    if (!domainModule || !Array.isArray(domainModule)) {
        throw new Error(`[STORE]: Could not extract reducer array from domain: "${domain}".`);
    }

    const reducer: Reducer = domainModule.find(({ type }) => type === reducerName);

    if (!reducer) {
        throw new Error(`[STORE]: Could not find reducer: "${reducerName}" in domain: "${domain}".`);
    }

    return { domain, reducer };
};