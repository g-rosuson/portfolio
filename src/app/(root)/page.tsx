import React from 'react';
import { Metadata } from 'next';
import { DEFAULT_OG_IMAGE, SITE_URL } from 'src/shared/constants/site';

import Home from 'src/components/pages/home/Home';
import Heading from 'src/components/ui/heading/Heading';

import styling from './Home.module.scss';

const DESCRIPTION = `Guðmundur Rósuson is a skilled front-end developer from Reykjavík, Iceland,
         specializing in creating responsive, user-friendly, and dynamic web applications.`;

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: 'Home – G.Rósuson',
    description: DESCRIPTION,
    openGraph: {
        title: 'Rósuson – Portfolio',
        description: DESCRIPTION,
        url: SITE_URL,
        type: 'website',
        images: [DEFAULT_OG_IMAGE]
    },
    twitter: {
        title: 'Rósuson - Portfolio',
        description: DESCRIPTION
    },
    alternates: {
        canonical: SITE_URL
    }
};


const Root = () => (
    <>
        <div className={styling.hidden}>
            <Heading level={1}>
                Guðmundur Rósuson – Web developer portfolio
            </Heading>
        </div>

        <Home/>
    </>
);

export default Root;
