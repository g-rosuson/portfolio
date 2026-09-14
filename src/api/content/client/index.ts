import { promises as fs } from 'fs';
import path from 'path';

import helpers from './helpers';
import mappers from './mappers';

import type { CollectionName, DocumentFile } from './types';

import CONSTANTS from './constants';

/**
 * Reads every MDX file in a content collection.
 */
const getDocuments = async (collectionName: CollectionName): Promise<DocumentFile[]> => {
    const collectionDirectory = helpers.getCollectionDirectory(collectionName);
    const entries = await fs.readdir(collectionDirectory, { withFileTypes: true });
    const mdxFilenames = entries
        .filter((entry) => entry.isFile() && entry.name.endsWith(CONSTANTS.FILE_EXTENSION))
        .map((entry) => entry.name);

    return Promise.all(mdxFilenames.map(async (filename) => {
        const slug = path.basename(filename, CONSTANTS.FILE_EXTENSION);
        const source = await fs.readFile(path.join(collectionDirectory, filename), 'utf8');

        return mappers.toDocumentFile(slug, source);
    }));
};

/**
 * Reads a single MDX file by slug from a content collection.
 * Returns null if the file is missing or the slug is not a file in that collection.
 */
const getDocument = async (slug: string, collectionName: CollectionName): Promise<DocumentFile | null> => {
    const filePath = helpers.resolveDocumentPath(slug, collectionName);

    if (!filePath) {
        return null;
    }

    try {
        const source = await fs.readFile(filePath, 'utf8');

        return mappers.toDocumentFile(slug, source);
    } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
            return null;
        }

        throw error;
    }
};

const client = {
    getDocuments,
    getDocument
};

export default client;
