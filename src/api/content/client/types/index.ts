type CollectionName = 'articles';

interface DocumentFile {
    slug: string;
    /** Full file contents, including the YAML frontmatter block. */
    source: string;
    /**
     * File body after the YAML frontmatter block is removed.
     * Markdown, MDX, and whitespace are unchanged.
     */
    strippedSource: string;
    frontmatter: Record<string, unknown>;
}

export type { CollectionName, DocumentFile };
