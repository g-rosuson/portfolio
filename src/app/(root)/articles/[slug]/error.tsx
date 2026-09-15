'use client';

import React from 'react';

import BackBtn from 'src/components/ui/backBtn/BackBtn';
import Heading from 'src/components/ui/heading/Heading';

const BACK_BTN_LABEL = 'Articles';
const ERROR_MESSAGE = 'Something went wrong, please try again.';
const ERROR_TITLE = 'An error occurred';

export default function Error() {
    return (
        <>
            <BackBtn href="/articles" label={BACK_BTN_LABEL}/>

            <Heading level={1} size="lg">
                {ERROR_TITLE}
            </Heading>

            <p>
                {ERROR_MESSAGE}
            </p>
        </>
    );
}
