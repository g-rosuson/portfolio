'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { PROJECT_VIDEO_SRC } from 'src/shared/constants/projects';

import Heading from 'src/components/ui/heading/Heading';

import { Project, Theme } from 'src/shared/types/projects';

import styling from './ProjectCard.module.scss';

type Props = Omit<Project, 'details'> & {
    theme: Theme
}

const ProjectCard = ({ uniqueName, theme, title, about, id }: Props) => {
    // Refs
    const videoRef = useRef<HTMLVideoElement>(null);


    /**
     * Plays the video when the user hovers or focuses the [.image] box.
     */
    const videoHandler = (event: React.FocusEvent | React.MouseEvent) => {
        const shouldPlay = event.type === 'mouseenter' || event.type === 'focus';
        shouldPlay ? videoRef.current?.play() : videoRef.current?.pause();
    };


    const videoSrc = PROJECT_VIDEO_SRC[uniqueName];


    return (
        <Link href={`projects/${id}`}>
            <article className={styling.card}>
                <div
                    tabIndex={0}
                    aria-label="Preview video"
                    role="button"
                    className={styling.image}
                    data-theme={theme}
                    onMouseEnter={videoHandler}
                    onMouseLeave={videoHandler}
                    onFocus={videoHandler}
                    onBlur={videoHandler}
                >
                    <video
                        ref={videoRef}
                        className={styling.video}
                        src={videoSrc}
                        muted
                        loop
                    />

                    <div className={styling.background}>
                        <div className={styling.badge}>
                            <span className={styling.label}>
                                Preview
                            </span>
                        </div>
                    </div>
                </div>

                <div className={styling.text}>
                    <div className={styling.heading}>
                        <Heading level={2} size="sm">
                            {title}
                        </Heading>
                    </div>

                    <p className={styling.description}>
                        {about}
                    </p>
                </div>
            </article>
        </Link>
    );
};

export default ProjectCard;