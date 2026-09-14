import { articleFrontmatterSchema, articleSchema } from 'src/api/content/queries/articles/schemas';
import { z } from 'zod';

type ArticleFrontmatter = z.infer<typeof articleFrontmatterSchema>;
type Article = z.infer<typeof articleSchema>;

export type { ArticleFrontmatter, Article };
