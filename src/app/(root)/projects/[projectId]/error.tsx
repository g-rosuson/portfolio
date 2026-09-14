'use client';

import React from 'react';
import Link from 'next/link';

import Heading from 'src/components/ui/heading/Heading';

// TODO: Style/sync error pages
export default function Error() {
    return (
        <>
            <Heading level={2} size="xl">
                This project does not exist
            </Heading>

            <Link href="/projects">
                Back to projects
            </Link>
        </>
    );
}