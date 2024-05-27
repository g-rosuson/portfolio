import React from 'react';

import { IHeadingProps } from './types';

import styling from './Heading.module.scss';
const Heading = ({ size, children, level }: IHeadingProps) => {
    // Determine the heading classname based on the provided size
    let className = styling.heading;

    if (size === 'm') {
        className = styling.medium;
    }

    if (size === 's') {
        className = styling.small;
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