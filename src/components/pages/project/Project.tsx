'use client';

import React from 'react';
import Link from 'next/link';
import { PROJECT_VIDEO_SRC } from 'src/shared/constants/projects';

import Heading from 'src/components/ui/heading/Heading';
import { ChevronLeft } from 'src/components/ui/icons/Icons';

import { Theme, UniqueNames } from 'src/shared/types/projects';

import styling from './Project.module.scss';

interface Props {
    description: string;
    displayUrl: string;
    uniqueName: UniqueNames;
    title: string;
    stack: string[];
    links: string[];
    theme: Theme
    url: string;
}

const Project = ({ description, displayUrl, uniqueName, title, stack, links, theme, url }: Props) => {
    const videoSrc = PROJECT_VIDEO_SRC[uniqueName];


    return (
        <>
            <section className={styling.wrapper}>
                <div className={styling.header}>
                    <Link href="/projects" className={styling.back}>
                        <div className={styling.chevron}>
                            <ChevronLeft/>
                        </div>

                        <span className={styling.backToProject}>
                            Back to projects
                        </span>
                    </Link>

                    <div className={styling.heading}>
                        <Heading level={1} size="xl" removeMargin>
                            {title}
                        </Heading>
                    </div>

                    <Link href={url} target="_blank" rel="noopener noreferrer">
                        <span className={styling.projectUrl}>
                            {displayUrl}
                        </span>
                    </Link>
                </div>

                <div className={styling.text}>
                    <p>
                        {description}
                    </p>
                </div>

                <div className={styling.stack}>
                    <div className={styling.label}>
                        Tech stack
                    </div>

                    <div className={styling.list}>
                        {stack.map(item => (
                            <span key={item} className={styling.listItem}>
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                <div hidden={links.length === 0}>
                    <div className={styling.label}>
                        UNDER THE HOOD
                    </div>

                    <div className={styling.list}>
                        {links.map(link => (
                            <span key={link} className={styling.listItem}>
                                {link}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            <section>
                <div className={styling.frame} data-theme={`${theme}`}>
                    <video
                        className={styling.video}
                        src={videoSrc}
                        autoPlay
                        muted
                        loop
                    />
                </div>
            </section>
        </>
    );
};

export default Project;