import { z } from 'zod';

const articleFrontmatterSchema = z.object({
    title: z.string().min(1),
    date: z.string().min(1),
    description: z.string().min(1),
    tags: z.array(z.string()).min(1),
    draft: z.boolean(),
    ogImage: z.string().min(1)
});

const articleMetaSchema = articleFrontmatterSchema.extend({
    slug: z.string().min(1)
});

const articleSchema = articleMetaSchema.extend({
    source: z.string()
});

export { articleFrontmatterSchema, articleMetaSchema, articleSchema };
