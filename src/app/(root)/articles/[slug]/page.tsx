import React, { cache, Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote-client/rsc';
import remarkGfm from 'remark-gfm';
import api from 'src/api';
import { mdxComponents } from 'src/components/shared/mdx/components';
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH, SITE_URL } from 'src/shared/constants/site';

import Article from 'src/components/pages/article/Article';

export const dynamicParams = false;

/**
 * Retrieves slugs for the statically generated article pages.
 */
export async function generateStaticParams() {
    const articles = await api.content.queries.articles.getAll();

    return articles.map(({ slug }) => ({ slug }));
}

const getArticleData = cache(async (slug: string) => {
    return await api.content.queries.articles.getBySlug(slug);
});

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const article = await getArticleData(params.slug);

    // TODO: When this throws the build fails, do we need a error page?
    if (!article) {
        throw new Error('Article not found');
    }

    const url = `${SITE_URL}/articles/${params.slug}`;
    const imageUrl = `${SITE_URL}/images/articles/${params.slug}/${article.ogImage}`;

    return {
        metadataBase: new URL(url),
        title: `Article – ${article.title}`,
        description: article.description,
        openGraph: {
            title: `Article – ${article.title}`,
            description: article.description,
            url,
            type: 'website',
            images: [
                {
                    url: imageUrl,
                    width: OG_IMAGE_WIDTH,
                    height: OG_IMAGE_HEIGHT,
                    alt: article.title
                }
            ]
        },
        twitter: {
            title: `Article – ${article.title}`,
            description: article.description
        },
        alternates: {
            canonical: url
        }
    };
}

const Page = async ({ params: { slug } }: { params: { slug: string } }) => {
    const article = await getArticleData(slug);

    // TODO: When this throws the build fails, do we need a error page?
    if (!article) {
        throw new Error('Article not found');
    }

    return (
        <Article title={article.title} date={article.date} tags={article.tags} draft={article.draft}>
            <Suspense>
                <MDXRemote
                    source={article.source}
                    components={mdxComponents}
                    options={{
                        parseFrontmatter: true,
                        mdxOptions: { remarkPlugins: [remarkGfm] }
                    }}
                />
            </Suspense>
        </Article>
    );
};

export default Page;
