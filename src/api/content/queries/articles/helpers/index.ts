import config from 'src/config';

import type { Article } from 'src/shared/types/articles';

/**
 * Draft articles are listed in development. In production only non-drafts are listed.
 */
const isListed = (article: Article) => !config.isProduction || !article.draft;

/**
 * Converts a validated DD-MM-YYYY date to an ISO calendar date (YYYY-MM-DD).
 */
const toIsoDateString = (date: string): string => {
    const [day, month, year] = date.split('-');

    return `${year}-${month}-${day}`;
};

const helpers = {
    isListed,
    toIsoDateString
};

export default helpers;
