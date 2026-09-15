import client from 'src/api/content/client';

import helpers from './helpers';
import mappers from './mappers';

import type { CollectionName } from 'src/api/content/client/types';

const COLLECTION_NAME: CollectionName = 'articles';

/**
 * Retrieves all listed articles, newest date first.
 */
const getAll = async () => {
    const documents = await client.getDocuments(COLLECTION_NAME);
    const articles = documents.map(mappers.mapToArticle).filter(helpers.isListed);

    return articles.sort((a, b) => b.date.localeCompare(a.date));
};

/**
 * Retrieves a listed article by slug, including the MDX body (no frontmatter).
 * Returns null if the file is missing, or if it is a draft in production.
 */
const getBySlug = async (slug: string) => {
    const document = await client.getDocument(slug, COLLECTION_NAME);

    if (!document) {
        return null;
    }

    const article = mappers.mapToArticle(document);

    if (!helpers.isListed(article)) {
        return null;
    }

    return article;
};

const articles = {
    getAll,
    getBySlug
};

export default articles;
