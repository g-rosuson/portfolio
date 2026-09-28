import React from 'react';

import styling from './Badge.module.scss';

interface Props {
    variant?: 'green';
    children: React.ReactNode;
}

const Badge = ({ children, variant }: Props) => {
    return (
        <div className={styling.badge} data-variant={variant}>
            {children}
        </div>
    );
};

export default Badge;