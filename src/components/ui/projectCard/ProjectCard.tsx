'use client';

import React from 'react';
import Link from 'next/link';

import Heading from 'src/components/ui/heading/Heading';

import { Props } from './ProjectCard.types';
import { UniqueNames } from 'src/shared/types/projects';

import styling from './ProjectCard.module.scss';

const ProjectCard = ({ uniqueName, theme, title, about, id }: Props) => {
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


    // Map project names to the corresponding video url
    // TODO: Get videos from a bucket
    const projectNameToVideoSrc: Record<UniqueNames, string> = {
        'project-fernweh': '/videos/fernweh_schweiz_video.mp4',
        'project-rosa-olof': '/videos/rosa_olof_video.mp4'
    };


    // Determine video source
    const videoSrc = projectNameToVideoSrc[uniqueName];


    return (
        <Link href={`projects/${id}`}>
            <article className={styling.card}>
                <div className={styling.image} data-theme={`${theme}`}>
                    <video
                        className={styling.video}
                        src={videoSrc}
                        onMouseEnter={videoHandler}
                        onMouseLeave={(e) => videoHandler(e, false)}
                        muted
                        loop
                    />
                </div>

                <div className={styling.text}>
                    <Heading level={2} size="l">
                        {title}
                    </Heading>

                    <p className={styling.description}>
                        {about}
                    </p>
                </div>
            </article>
        </Link>
    );
};

export default ProjectCard;