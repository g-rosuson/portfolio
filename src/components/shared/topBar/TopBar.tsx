'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Logo from 'src/components/ui/logo/Logo';

import { usePathname } from 'next/navigation';

import styling from './TopBar.module.scss';

const SetTheme = dynamic(() => import('src/components/shared/topBar/setTheme/SetTheme'), {
    ssr: false,
    loading: () => <div className={styling.skeleton}/>
});

const ROUTES = [
    {
        href: '/articles',
        label: 'Articles'
    },
    {
        href: '/projects',
        label: 'Projects'
    }
];


// TODO: Add a hamburger menu for mobile

const TopBar = () => {
    // Hooks
    const currentPath = usePathname();

    return (
        <header className={styling.header}>
            <nav className={styling.nav}>
                <Link href="/">
                    <div className={styling.logo}>
                        <Logo/>
                    </div>
                </Link>

                <div className={styling.wrapper}>
                    {ROUTES.map(route => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={currentPath === route.href ? styling.active : styling.idle}
                        >
                            {route.label}
                        </Link>
                    ))}

                    <SetTheme/>
                </div>
            </nav>
        </header>
    );
};

export default TopBar;