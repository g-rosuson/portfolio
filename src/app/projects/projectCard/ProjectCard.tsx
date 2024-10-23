'use client';

import React from 'react';

import Heading from 'src/components/ui/heading/Heading';

import styling from './ProjectCard.module.scss';

const ProjectCard = ({ project }: any) => {
    /**
     * Plays the video when the user hovers over it and
     * pauses when the user stops hovering.
     */
    const videoHandler = async (event: React.MouseEvent<HTMLVideoElement, MouseEvent>, play = true) => {
        if (play) {
            await event.currentTarget.play();
            return;
        }

        event.currentTarget.pause();
    };

    return (
        <article className={styling.card}>
            <div className={styling.image} data-theme={`${project.theme}`}>
                <video
                    className={styling.video}
                    src={project.videoSrc}
                    onMouseEnter={videoHandler}
                    onMouseLeave={(e) => videoHandler(e, false)}
                    loop
                />
            </div>

            <div className={styling.text}>
                <Heading level={2} size="l">
                    {project.title}
                </Heading>

                <p className={styling.description}>
                    {project.description}
                </p>
            </div>
        </article>
    );
};

export default ProjectCard;