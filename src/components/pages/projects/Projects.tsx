import React from 'react';

import ProjectCard from './projectCard/ProjectCard';
import Heading from 'src/components/ui/heading/Heading';

import { Project } from 'src/shared/types/projects';

import styling from './Projects.module.scss';

const PROJECTS_HEADING = 'Projects';

const Projects = ({ projects }: { projects: Project[] }) => {
    return (
        <section>
            <Heading level={1} size="lg">
                {PROJECTS_HEADING}
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

export default Projects;