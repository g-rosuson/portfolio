'use client';

import React from 'react';

import Button from 'src/components/ui/button/Button';
import Heading from 'src/components/ui/heading/Heading';

const ERROR_TITLE = 'An error occurred';
const ERROR_MESSAGE = 'Something went wrong, please try again.';
const RETRY_BUTTON_LABEL = 'Retry';

import styling from './Error.module.scss';

export default function Error({ title, message, reset }: { title?: string, message?: string, reset: () => void }) {
    return (
        <div>
            <Heading level={1} size="lg">
                {title || ERROR_TITLE}
            </Heading>

            <p className={styling.message}>
                {message || ERROR_MESSAGE}
            </p>

            <Button label={RETRY_BUTTON_LABEL} ariaLabel={RETRY_BUTTON_LABEL} onClick={reset}/>
        </div>
    );
}
