'use client';

import React from 'react';
import Link from 'next/link';

import Heading from 'src/components/ui/heading/Heading';

export default function Error() {
    return (
        <>
            <Heading level={1} size="lg">
                This article does not exist
            </Heading>

            <Link href="/articles">
                Back to articles
            </Link>
        </>
    );
}
