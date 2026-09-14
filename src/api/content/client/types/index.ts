type CollectionName = 'articles';

interface DocumentFile {
    slug: string;
    source: string;
    frontmatter: Record<string, unknown>;
}

export type { CollectionName, DocumentFile };
