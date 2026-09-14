import React from 'react';

import styling from './Placeholder.module.scss';

const PLACEHOLDER_LABEL = 'No articles match these filters...';

const Placeholder = () => {
    return (
        <p className={styling.placeholder}>
            {PLACEHOLDER_LABEL}
        </p>
    );
};

export default Placeholder;