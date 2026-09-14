import { getFrontmatter } from 'next-mdx-remote-client/utils';

import type { DocumentFile } from '../types';

/**
 * Maps file contents to a document the query layer can validate.
 */
const toDocumentFile = (slug: string, source: string): DocumentFile => {
    const { frontmatter } = getFrontmatter(source);

    return {
        slug,
        source,
        frontmatter: (frontmatter ?? {}) as Record<string, unknown>
    };
};

const mappers = {
    toDocumentFile
};

export default mappers;
