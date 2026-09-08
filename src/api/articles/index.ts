import { promises as fs } from 'fs';
import { getFrontmatter } from 'next-mdx-remote-client/utils';
import path from 'path';
import config from 'src/config';
import { articleMetaSchema, articleSchema } from 'src/shared/schemas/articles';

const ARTICLES_DIRECTORY = path.join(process.cwd(), 'src/content/articles');

const _readArticle = async (filename: string) => {
    const slug = path.basename(filename, '.mdx');
    const source = await fs.readFile(path.join(ARTICLES_DIRECTORY, filename), 'utf8');
    const { frontmatter } = getFrontmatter(source);

    return articleSchema.parse({ ...frontmatter, slug, source });
};

/**
 * Retrieves metadata for all articles. Newest first. Drafts are omitted in production.
 */
const getAll = async () => {
    const files = (await fs.readdir(ARTICLES_DIRECTORY)).filter((file) => file.endsWith('.mdx'));
    const articles = await Promise.all(files.map(_readArticle));

    return articles
        .filter((article) => !(config.isProduction && article.draft))
        .map((article) => articleMetaSchema.parse(article))
        .sort((a, b) => b.date.localeCompare(a.date));
};

/**
 * Retrieves a full article by slug, including the raw MDX source.
 * Returns null if the file is missing, or if it is a draft in production.
 */
const getBySlug = async (slug: string) => {
    try {
        const article = await _readArticle(`${slug}.mdx`);

        if (config.isProduction && article.draft) {
            return null;
        }

        return article;
    } catch (error) {
        if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
            return null;
        }

        throw error;
    }
};

const articles = {
    getAll,
    getBySlug
};

export default articles;
