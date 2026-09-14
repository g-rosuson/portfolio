import React, { ReactNode } from 'react';

import styling from './Heading.module.scss';

type Props = {
    size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs';
    level: 1 | 2 | 3;
    children: ReactNode;
    removeMargin?: boolean;
    color?: 'yellow';
}

/**
 * @note Due to yellow fitting badly and not giving enough contrast with white backgrounds,
 * we only apply the yellow color to the heading in dark mode. See scss file for more details.
 */
const Heading = ({ size = 'xl', level, children, removeMargin, color }: Props) => {
    // Determine the heading element based on the provided level
    const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;

    return (
        <Tag className={styling.base} data-color={color} data-size={size} data-remove-margin={!!removeMargin}>
            {children}
        </Tag>
    );
};

export default Heading;