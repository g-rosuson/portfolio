'use client';

import React from 'react';
import Link from 'next/link';

import Heading from 'src/components/ui/heading/Heading';

import styling from './Project.module.scss';

export default function Error() {
    return (
        <>
            <Heading level={2} size="xl">
                This project does not exist
            </Heading>

            <Link href="/projects">
                <span className={styling.link}>
                    Back to projects
                </span>
            </Link>
        </>
    );
}