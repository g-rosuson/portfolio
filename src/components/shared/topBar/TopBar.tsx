'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styling from './TopBar.module.scss';

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

                <Link
                    href="/projects"
                    className={currentPath === '/projects' ? styling.active : styling.idle}
                >
                    Projects
                </Link>
            </nav>
        </header>
    );
};

export default TopBar;