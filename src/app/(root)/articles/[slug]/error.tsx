'use client';

import React from 'react';

import BackBtn from 'src/components/ui/backBtn/BackBtn';
import Heading from 'src/components/ui/heading/Heading';

const BACK_BTN_LABEL = 'Articles';

export default function Error() {
    return (
        <>
            <BackBtn href="/articles" label={BACK_BTN_LABEL}/>

            <Heading level={1} size="lg">
                An error occurred
            </Heading>

            <p>
                Something went wrong, please try again.
            </p>
        </>
    );
}
