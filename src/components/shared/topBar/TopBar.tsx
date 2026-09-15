'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import SetTheme from 'src/components/shared/topBar/setTheme/SetTheme';
import Logo from 'src/components/ui/logo/Logo';

import styling from './TopBar.module.scss';

import config from './config';

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
                    {config.routes.map(route => (
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