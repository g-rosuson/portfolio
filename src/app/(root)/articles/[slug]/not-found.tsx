import React from 'react';

import BackBtn from 'src/components/ui/backBtn/BackBtn';
import Heading from 'src/components/ui/heading/Heading';

const BACK_BTN_LABEL = 'Articles';

/**
 * Renders when `notFound()` is called from this segment. Next serves that 404
 * as `<html id="__next_error__">`, and not the app layout. Therefore, removing
 * the `data-theme` attribute from the html tag and breaking theming in the app.
 * @see docs/theme.md
 */
export default function NotFound() {
    return (
        <>
            <BackBtn href="/articles" label={BACK_BTN_LABEL}/>

            <Heading level={1} size="lg">
                Article not found
            </Heading>

            <p>
                This article does not exist, make sure the URL is correct.
            </p>
        </>
    );
}