import React, { cache } from 'react';
import { Metadata } from 'next';
import api from 'src/api';
import { OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH, SITE_URL } from 'src/shared/constants/site';

import ProjectPage from 'src/components/pages/project/Project';

/**
 * Retrieves slugs for the statically generated project pages.
 */
export async function generateStaticParams() {
    const slugs = await api.firebase.queries.projects.getAll();


    return slugs.map(({ id }) => ({
        projectId: id
    }));
}

const getProjectData = cache(async (projectId: string) => {
    return await api.firebase.queries.projects.getById(projectId);
});

export async function generateMetadata({ params }: { params: { projectId: string } }): Promise<Metadata> {
    const project = await getProjectData(params.projectId);
    const url = `${SITE_URL}/projects/${params.projectId}`;
    const imageUrl = `${SITE_URL}/images/${project.details.metadata.ogImageName}`;


    return {
        metadataBase: new URL(url),
        title: `Project – ${project.title}`,
        description: project.details.metadata.description,
        openGraph: {
            title: project.title,
            description: project.about,
            url,
            type: 'website',
            images: [
                {
                    url: imageUrl,
                    width: OG_IMAGE_WIDTH,
                    height: OG_IMAGE_HEIGHT,
                    alt: `${project.title} logo`
                }
            ]
        },
        twitter: {
            title: project.title,
            description: project.about
        },
        alternates: {
            canonical: url
        }
    };
}

const Page = async ({ params: { projectId } }: { params: { projectId: string }}) => {
    const project = await getProjectData(projectId);


    return (
        <ProjectPage
            description={project.details.workflowDescription}
            displayUrl={project.details.displayUrl}
            uniqueName={project.uniqueName}
            title={project.title}
            stack={project.details.stack}
            links={project.details.links}
            theme={project.details.theme}
            url={project.details.url}
        />
    );
};

export default Page;