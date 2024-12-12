import { ActionType } from '../actions/types';

import reducerModules from '../reducers';

/**
 * Retrieves the domain and reducer from the action type.
 */
export const resources = (actionType: ActionType) => {
    // Retrieve domain and reducer reference from the action-type
    const resources = actionType.split('/');

    const [domain, reducerType] = resources;

    // Validate and retrieve the domain module
    const domainModule = reducerModules[domain];

    if (!domainModule || !Array.isArray(domainModule)) {
        throw new Error(`[STORE]: Could not extract reducer array from domain: "${domain}".`);
    }

    const reducer = domainModule.find(({ type }) => type === reducerType);

    if (!reducer) {
        throw new Error(`[STORE]: Could not find reducer: "${reducerType}" in domain: "${domain}".`);
    }

    return { domain, reducer };
};