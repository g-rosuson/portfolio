import React from 'react';
import { Metadata } from 'next';
import api from 'src/api';

import Heading from 'src/components/ui/heading/Heading';
import ProjectCard from 'src/components/ui/projectCard/ProjectCard';

import styling from './Projects.module.scss';

export const metadata: Metadata = {
    metadataBase: new URL('https://www.rosuson.com/projects'),
    title: 'Projects – G.Rósuson',
    description: 'An overview of projects Guðmundur Rósuson\'s has created',
    openGraph: {
        title: 'Projects – G.Rósuson',
        description: 'An overview of projects Guðmundur Rósuson\'s has created',
        url: 'https://www.rosuson.com/projects',
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
        title: 'Projects – G.Rósuson',
        description: 'An overview of projects Guðmundur Rósuson\'s has created'
    },
    alternates: {
        canonical: 'https://www.rosuson.com/projects'
    }
};

const Page = async () => {
    // Determine project
    const projects = await api.firebase.queries.projects.getAll();


    return (
        <section>
            <Heading level={1} size="xl">
                Projects
            </Heading>

            <div className={styling.cards}>
                {projects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        uniqueName={project.uniqueName}
                        theme={project.details.theme}
                        title={project.title}
                        about={project.about}
                        id={project.id}
                    />
                ))}
            </div>
        </section>
    );
};

export default Page;