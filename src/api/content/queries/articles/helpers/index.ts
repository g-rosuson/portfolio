import GithubSlugger from 'github-slugger';
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

/**
 * Turns a heading line into the text a reader actually sees.
 * `rehype-slug` slugs that visible text, not the raw markdown, so
 * `## Hello **world**` becomes "Hello world" and then id `hello-world`.
 * We strip the same markers here so `github-slugger` gets the same string.
 */
const stripInlineMarkdown = (value: string): string => {
    return value
        .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
        .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/<[^>]+>/g, '')
        .replace(/[*_~]/g, '')
        .trim();
};

/**
 * Builds the article section nav from the MDX body, before it is compiled.
 * The nav needs `{ id, title }` up front; `rehype-slug` only stamps ids later,
 * when MDX renders. Both sides use `github-slugger`, so a link to `#intro`
 * lands on the heading with that id.
 *
 * Fenced code is removed first so a `##` inside a snippet is not a nav item.
 * Every heading depth is still slugged, not only `##`. `rehype-slug` does the
 * same, so two titles that collide stay in lockstep (`intro`, then `intro-1`).
 * Only `##` headings are returned; deeper headings are slugged, not listed.
 */
const extractSections = (markdown: string): Article['sections'] => {
    const body = markdown.replace(/```[\s\S]*?```/g, '');
    const slugger = new GithubSlugger();
    const sections: Article['sections'] = [];
    const headingPattern = /^(#{2,6})\s+(.+)$/gm;

    let match = headingPattern.exec(body);

    while (match) {
        const depth = match[1].length;
        const title = stripInlineMarkdown(match[2]);
        const id = slugger.slug(title);

        if (depth === 2 && title) {
            sections.push({ id, title });
        }

        match = headingPattern.exec(body);
    }

    return sections;
};

const helpers = {
    isListed,
    toIsoDateString,
    estimateReadingMinutes,
    extractSections
};

export default helpers;
