'use client';

import React from 'react';

import BackBtn from 'src/components/ui/backBtn/BackBtn';
import Heading from 'src/components/ui/heading/Heading';

interface Props {
    href: string;
    backBtnLabel: string;
    title: string;
    message: string;
}

/**
 * Renders when `notFound()` is called from this segment. Next serves that 404
 * as `<html id="__next_error__">`, and not the app layout. Therefore, removing
 * the `data-theme` attribute from the html tag and breaking theming in the app.
 * @see docs/theme.md
 */
export default function NotFound({ href, backBtnLabel, title, message }: Props) {
    return (
        <>
            <BackBtn href={href} label={backBtnLabel}/>

            <Heading level={1} size="lg">
                {title}
            </Heading>

            <p>
                {message}
            </p>
        </>
    );
}