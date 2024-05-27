import { ReactNode } from 'react';

export interface IHeadingProps {
    size: 'l' | 'm' | 's',
    children: ReactNode,
    level: 1 | 2 | 3
}