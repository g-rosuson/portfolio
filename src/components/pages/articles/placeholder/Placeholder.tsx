import React from 'react';

import styling from './Placeholder.module.scss';

const FILTER_PLACEHOLDER_LABEL = 'No articles match these filters...';
const NO_ARTICLES_PLACEHOLDER_LABEL = 'No articles available...';

const Placeholder = ({ hasArticles }: { hasArticles: boolean }) => {
    return (
        <p className={styling.placeholder}>
            {hasArticles ? FILTER_PLACEHOLDER_LABEL : NO_ARTICLES_PLACEHOLDER_LABEL}
        </p>
    );
};

export default Placeholder;