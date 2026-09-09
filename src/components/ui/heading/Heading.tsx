import React, { ReactNode } from 'react';

import styling from './Heading.module.scss';

type Props = {
    size?: 'xl' | 'l' | 'm' | 's' | 'xs';
    level: 1 | 2 | 3;
    children: ReactNode;
    removeMargin?: boolean;
}

const Heading = ({ size = 'xl', level, children, removeMargin }: Props) => {
    // Determine the heading classname based on the provided size
    let sizeClass = styling.extraLarge;

    if (size === 'l') {
        sizeClass = styling.large;
    }

    if (size === 'm') {
        sizeClass = styling.medium;
    }

    if (size === 's') {
        sizeClass = styling.small;
    }

    if (size === 'xs') {
        sizeClass = styling.extraSmall;
    }

    // Determine the heading element based on the provided level
    const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;

    return (
        <Tag className={sizeClass} data-remove-margin={!!removeMargin}>
            {children}
        </Tag>
    );
};

export default Heading;