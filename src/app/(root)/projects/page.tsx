import React from 'react';
import { Metadata } from 'next';
import api from 'src/api';
import { DEFAULT_OG_IMAGE, SITE_URL } from 'src/shared/constants/site';

import Projects from 'src/components/pages/projects/Projects';

const PAGE_URL = `${SITE_URL}/projects`;
const TITLE = 'Projects – G.Rósuson';
const DESCRIPTION = 'An overview of projects Guðmundur Rósuson\'s has created';

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

// TODO: Add error components
const Page = async () => {
    const projects = await api.firebase.queries.projects.getAll();

    return <Projects projects={projects}/>;
};

export default Page;