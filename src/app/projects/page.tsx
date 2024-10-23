import React from 'react';

import ProjectCard from './projectCard/ProjectCard';

import styling from './Projects.module.scss';

const Page = () => {
    // TODO: Get from endpoint when dashboard is integrated
    // Determine projects
    const projects = [
        {
            title: 'Fernweh Schweiz',
            // eslint-disable-next-line max-len
            description: `Fernweh Schweiz is an association that focuses on showing the negative environmental impact
             flying has and at the same time illustrating the great sustainable travel options Switzerland has to offer.`,
            theme: 'blue',
            videoSrc: '/videos/fernweh_schweiz_video.mp4'
        },
        {
            title: 'Rósa Ólöf',
            // eslint-disable-next-line max-len
            description: `Rósa Ólöf is an author from Reykjavík, Iceland. Among her notable publications is the children's
             book Bláeyg. And the autobiography Kæra nafna, offering a deeply personal glimpse into her life and experiences.`,
            theme: 'brown',
            videoSrc: '/videos/rosa_olof_video.mp4'
        }
    ];


    return (
        <section className={styling.container}>
            {projects.map((project, index) => <ProjectCard key={index} project={project}/>)}
        </section>
    );
};

export default Page;