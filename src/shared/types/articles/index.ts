import { articleFrontmatterSchema, articleMetaSchema, articleSchema } from 'src/shared/schemas/articles';
import { z } from 'zod';

type ArticleFrontmatter = z.infer<typeof articleFrontmatterSchema>;
type ArticleMeta = z.infer<typeof articleMetaSchema>;
type Article = z.infer<typeof articleSchema>;

export type { ArticleFrontmatter, ArticleMeta, Article };
