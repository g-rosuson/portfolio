'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styling from './TopBar.module.scss';

const SetTheme = dynamic(() => import('src/components/shared/topBar/setTheme/SetTheme'), {
    ssr: false,
    loading: () => <div className={styling.skeleton}/>
});

const ROUTES = [
    {
        href: '/projects',
        label: 'Projects'
    }
];

const TopBar = () => {
    // Hooks
    const currentPath = usePathname();


    return (
        <header className={styling.header}>
            <nav className={styling.nav}>
                <Link href="/">
                    <Image
                        className={styling.logo}
                        src="/images/logo.svg"
                        alt="G.Rósuson's website logo"
                        title="G.Rósuson's signiture logo"
                        width={64}
                        height={32}
                    />
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