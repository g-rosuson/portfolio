import React, { ReactNode } from 'react';

// eslint-disable-next-line css-modules/no-unused-class
import styling from './Heading.module.scss';

type Props = {
    size?: 'xl' | 'l' | 'm' | 's';
    level: 1 | 2 | 3;
    color?: 'blue' | 'brown';
    children: ReactNode;
}

const Heading = ({ size, level, color, children }: Props) => {
    // Determine the heading classname based on the provided size
    let className = styling.heading;

    if (size === 'l') {
        className = styling.large;
    }

    if (size === 'm') {
        className = styling.medium;
    }

    if (size === 's') {
        className = styling.small;
    }

    if (color) {
        className = className + ' ' + styling[color];
    }


    // Determine the heading element based on the provided level
    const Tag = `h${level}` as keyof React.JSX.IntrinsicElements;


    return (
        <Tag className={className}>
            {children}
        </Tag>
    );
};

export default Heading;