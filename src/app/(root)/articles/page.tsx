import React from 'react';
import { Metadata } from 'next';
import api from 'src/api';
import { DEFAULT_OG_IMAGE, SITE_URL } from 'src/shared/constants/site';

import Articles from 'src/components/pages/articles/Articles';

const PAGE_URL = `${SITE_URL}/articles`;
const TITLE = 'Articles – G.Rósuson';
const DESCRIPTION = 'An overview of articles Guðmundur Rósuson has written';

export const metadata: Metadata = {
    metadataBase: new URL(PAGE_URL),
    title: TITLE,
    description: DESCRIPTION,
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        url: PAGE_URL,
        type: 'website',
        images: [DEFAULT_OG_IMAGE]
    },
    twitter: {
        title: TITLE,
        description: DESCRIPTION
    },
    alternates: {
        canonical: PAGE_URL
    }
};

const Page = async () => {
    const articles = await api.content.queries.articles.getAll();

    return <Articles articles={articles}/>;
};

export default Page;
