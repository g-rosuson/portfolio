'use client';

import React from 'react';
import Link from 'next/link';
import { PROJECT_VIDEO_SRC } from 'src/shared/constants/projects';

import BackBtn from 'src/components/ui/backBtn/BackBtn';
import Heading from 'src/components/ui/heading/Heading';

import { Theme, UniqueNames } from 'src/shared/types/projects';

import styling from './Project.module.scss';

const BACK_BTN_LABEL = 'Back to projects';
const TECH_STACK_LABEL = 'Tech stack';
const UNDER_THE_HOOD_LABEL = 'Under the hood';

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
            <section className={styling.container}>
                <div>
                    <BackBtn href="/projects" label={BACK_BTN_LABEL}/>

                    <Heading level={1} size="lg" removeMargin>
                        {title}
                    </Heading>

                    <Link href={url} target="_blank" rel="noopener noreferrer">
                        <span className={styling.url}>
                            {displayUrl}
                        </span>
                    </Link>
                </div>

                <p>
                    {description}
                </p>

                <div>
                    <Heading level={2} size="xs">
                        {TECH_STACK_LABEL}
                    </Heading>

                    <div className={styling.list}>
                        {stack.map(item => (
                            <span key={item} className={styling.item}>
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                <div hidden={links.length === 0}>
                    <Heading level={2} size="xs">
                        {UNDER_THE_HOOD_LABEL}
                    </Heading>

                    <div className={styling.list}>
                        {links.map(link => (
                            <span key={link} className={styling.item}>
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