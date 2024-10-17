import React from 'react';

export const Redirect = ({ thick }: { thick?: boolean }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={thick ? 2 : 1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6"/>
        <path d="M11 13l9 -9"/>
        <path d="M15 4h5v5"/>
    </svg>
);

export const Expand = ({ thick }: { thick?: boolean }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={thick ? 2 : 1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M16 4l4 0l0 4"/>
        <path d="M14 10l6 -6"/>
        <path d="M8 20l-4 0l0 -4"/>
        <path d="M4 20l6 -6"/>
        <path d="M16 20l4 0l0 -4"/>
        <path d="M14 14l6 6"/>
        <path d="M8 4l-4 0l0 4"/>
        <path d="M4 4l6 6"/>
    </svg>
);

export const VerticalDots = ({ thick }: { thick?: boolean }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={thick ? 2 : 1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"/>
        <path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"/>
        <path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"/>
    </svg>
);