import { getFrontmatter } from 'next-mdx-remote-client/utils';

import type { DocumentFile } from '../types';

/**
 * Maps file contents to a document the query layer can validate.
 * `getFrontmatter` splits YAML into `frontmatter` and leaves the body as `strippedSource`;
 * it does not collapse whitespace or strip markdown.
 */
const toDocumentFile = (slug: string, source: string): DocumentFile => {
    const { frontmatter, strippedSource } = getFrontmatter(source);

    return {
        slug,
        source,
        strippedSource,
        frontmatter: (frontmatter ?? {}) as Record<string, unknown>
    };
};

const mappers = {
    toDocumentFile
};

export default mappers;
