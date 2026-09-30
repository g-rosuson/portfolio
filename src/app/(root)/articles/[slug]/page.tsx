import React, { cache } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import api from 'src/api';
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH, SITE_URL } from 'src/shared/constants/site';

import Article from 'src/components/pages/article/Article';

/**
 * Retrieves slugs for the statically generated article pages.
 */
export async function generateStaticParams() {
    const articles = await api.content.queries.articles.getAll();

    return articles.map(({ slug }) => ({ slug }));
}

/**
 * Retrieves article data by slug.
 */
const getArticleData = cache(async (slug: string) => {
    return await api.content.queries.articles.getBySlug(slug);
});

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const article = await getArticleData(slug);

    if (!article) {
        notFound();
    }

    const url = `${SITE_URL}/articles/${slug}`;
    const imageUrl = `${SITE_URL}/images/articles/${slug}/${article.ogImage}`;

    return {
        metadataBase: new URL(url),
        title: article.title,
        description: article.description,
        openGraph: {
            title: article.title,
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
            title: article.title,
            description: article.description
        },
        alternates: {
            canonical: url
        }
    };
}

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const article = await getArticleData(slug);

    if (!article) {
        notFound();
    }

    return (
        <Article
            title={article.title}
            date={article.date}
            tags={article.tags}
            draft={article.draft}
            source={article.source}
            slug={article.slug}
            readingTimeMinutes={article.readingTimeMinutes}
            sections={article.sections}
        />
    );
};

export default Page;
