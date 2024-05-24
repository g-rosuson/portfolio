'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styling from './TopBar.module.scss';

const TopBar = () => {
    const currentPath = usePathname();

    return (
        <header className={styling.header}>
            <nav className={styling.nav}>
                <Link
                    href="/"
                    className={currentPath === '/' ? styling.active : styling.idle}
                >
                    <span className={styling.wrapper}>
                        Home
                    </span>
                </Link>

                <Link
                    href="/projects"
                    className={currentPath === '/projects' ? styling.active : styling.idle}
                >
                    <span className={styling.wrapper}>
                        Projects
                    </span>
                </Link>

                <Link
                    href="/blog"
                    className={currentPath === '/blog' ? styling.active : styling.idle}
                >
                    <span className={styling.wrapper}>
                        Blog
                    </span>
                </Link>
            </nav>
        </header>
    );
};

export default TopBar;