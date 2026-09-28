import path from 'path';

import type { CollectionName } from '../types';

import CONSTANTS from '../constants';

/**
 * Returns the absolute path to the directory containing all documents in a collection.
 */
const getCollectionDirectory = (collectionName: CollectionName) => {
    return path.join(CONSTANTS.CONTENT_DIRECTORY, collectionName);
};

/**
 * A slug is a single path segment: the MDX filename without the extension.
 */
const isSafeSlug = (slug: string) => {
    if (!slug || slug === '.' || slug === '..' || slug.includes('\0')) {
        return false;
    }

    return !slug.includes('/') && !slug.includes('\\');
};

const resolveDocumentPath = (slug: string, collectionName: CollectionName) => {
    if (!isSafeSlug(slug)) {
        return null;
    }

    const collectionDirectory = getCollectionDirectory(collectionName);
    const resolvedPath = path.resolve(collectionDirectory, `${slug}${CONSTANTS.FILE_EXTENSION}`);
    const relativePath = path.relative(collectionDirectory, resolvedPath);

    if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
        return null;
    }

    return resolvedPath;
};

const helpers = {
    getCollectionDirectory,
    resolveDocumentPath
};

export default helpers;
