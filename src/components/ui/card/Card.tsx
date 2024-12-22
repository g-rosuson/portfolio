'use client';

import React, { useRef } from 'react';
import Link from 'next/link';

import Heading from 'src/components/ui/heading/Heading';

import { Props } from './Card.types';
import { UniqueNames } from 'src/shared/types/projects';

import styling from './Card.module.scss';

const Card = ({ uniqueName, theme, title, about, id }: Props) => {
    // Refs
    const videoRef = useRef<HTMLVideoElement>(null);


    /**
     * Plays the video when the user hovers or focuses the [.image] box.
     */
    const videoHandler = (event: React.FocusEvent | React.MouseEvent) => {
        const shouldPlay = event.type === 'mouseenter' || event.type === 'focus';
        shouldPlay ? videoRef.current?.play() : videoRef.current?.pause();
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
                        <Heading level={2} size="l">
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

export default Card;