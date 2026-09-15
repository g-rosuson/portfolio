import config from 'src/config';

import type { Article } from 'src/shared/types/articles';

const WORDS_PER_MINUTE = 200;

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

/**
 * Estimates whole minutes to read an MDX body (`strippedSource`).
 * Expects YAML frontmatter to already be removed so keys like title and tags are not counted.
 * Then strips markdown syntax before counting words.
 */
const estimateReadingMinutes = (markdown: string): number => {
    const text = markdown
        .replace(/```[\s\S]*?```/g, ' ')
        .replace(/`[^`]*`/g, ' ')
        .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
        .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
        .replace(/<[^>]+>/g, ' ')
        .replace(/^#{1,6}\s+/gm, '')
        .replace(/^\s*[-*+]\s+/gm, '')
        .replace(/^\s*>+\s*/gm, '')
        .replace(/[*_~]/g, '');

    const words = text.trim().split(/\s+/).filter(Boolean).length;

    return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
};

const helpers = {
    isListed,
    toIsoDateString,
    estimateReadingMinutes
};

export default helpers;
