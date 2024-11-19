import React from 'react';
import { Metadata } from 'next';

import Home from 'src/components/pages/home/Home';
import Heading from 'src/components/ui/heading/Heading';

import styling from './Home.module.scss';

export const metadata: Metadata = {
    metadataBase: new URL('https://www.rosuson.com'),
    title: 'Home – G.Rósuson',
    description: `Guðmundur Rósuson is a skilled front-end developer from Reykjavík, Iceland,
         specializing in creating responsive, user-friendly, and dynamic web applications.`,
    openGraph: {
        title: 'Rósuson – Portfolio',
        description: `Guðmundur Rósuson is a skilled front-end developer from Reykjavík, Iceland,
         specializing in creating responsive, user-friendly, and dynamic web applications.`,
        url: 'https://www.rosuson.com',
        type: 'website',
        images: [
            {
                url: 'https://www.rosuson.com/images/og_img_rosuson.png',
                width: 1200,
                height: 630,
                alt: 'Rósuson website logo'
            }
        ]
    },
    twitter: {
        title: 'Rósuson - Portfolio',
        description: `Guðmundur Rósuson is a skilled front-end developer from Reykjavík, Iceland,
         specializing in creating responsive, user-friendly, and dynamic web applications.`
    },
    alternates: {
        canonical: 'https://www.rosuson.com'
    }
};

// TODO: We are downloading two fonts atm
// TODO: Fix last frame in projector
const Root = () => (
    <>
        <div className={styling.hidden}>
            <Heading level={1} size="s">
                Guðmundur Rósuson – Web developer portfolio
            </Heading>
        </div>

        <Home/>
    </>
);

export default Root;
