import helpers from '../helpers';

import type { DocumentFile } from 'src/api/content/client/types';
import type { Article } from 'src/shared/types/articles';

import { articleSchema } from '../schemas';

/**
 * Maps a raw content file to a validated article.
 */
const mapToArticle = (document: DocumentFile): Article => {
    try {
        const article = articleSchema.parse({
            ...document.frontmatter,
            slug: document.slug,
            source: document.strippedSource,
            readingTimeMinutes: helpers.estimateReadingMinutes(document.strippedSource),
            sections: helpers.extractSections(document.strippedSource)
        });

        return {
            ...article,
            date: helpers.toIsoDateString(article.date)
        };
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);

        throw new Error(`Invalid article "${document.slug}": ${message}`);
    }
};

const mappers = {
    mapToArticle
};

export default mappers;
