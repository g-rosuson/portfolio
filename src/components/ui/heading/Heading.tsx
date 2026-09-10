import React, { ReactNode } from 'react';

import styling from './Heading.module.scss';

type Props = {
    size?: 'xl' | 'l' | 'm' | 's' | 'xs';
    level: 1 | 2 | 3;
    children: ReactNode;
    removeMargin?: boolean;
    color?: 'yellow';
}

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