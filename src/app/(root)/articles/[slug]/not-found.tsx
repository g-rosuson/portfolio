import React from 'react';
import { Metadata } from 'next';

import NotFoundComponent from 'src/components/shared/notFound/NotFound';

const BACK_BTN_LABEL = 'Articles';
const NOT_FOUND_TITLE = 'Article not found';
const NOT_FOUND_MESSAGE = 'This article does not exist, make sure the URL is correct.';

export const metadata: Metadata = {
    title: NOT_FOUND_TITLE,
    robots: { index: false }
};

/**
 * Renders when `notFound()` is called from this segment. Next serves that 404
 * as `<html id="__next_error__">`, and not the app layout. Therefore, removing
 * the `data-theme` attribute from the html tag and breaking theming in the app.
 * @see docs/theme.md
 */
export default function NotFound() {
    return <NotFoundComponent href="/articles" backBtnLabel={BACK_BTN_LABEL} title={NOT_FOUND_TITLE} message={NOT_FOUND_MESSAGE}/>;
}