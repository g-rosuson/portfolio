import React from 'react';

import NotFoundComponent from 'src/components/shared/notFound/NotFound';

const BACK_BTN_LABEL = 'Projects';
const NOT_FOUND_TITLE = 'Project not found';
const NOT_FOUND_MESSAGE = 'This project does not exist, make sure the URL is correct.';

/**
 * Renders when `notFound()` is called from this segment. Next serves that 404
 * as `<html id="__next_error__">`, and not the app layout. Therefore, removing
 * the `data-theme` attribute from the html tag and breaking theming in the app.
 * @see docs/theme.md
 */
export default function NotFound() {
    return <NotFoundComponent href="/projects" backBtnLabel={BACK_BTN_LABEL} title={NOT_FOUND_TITLE} message={NOT_FOUND_MESSAGE}/>;
}