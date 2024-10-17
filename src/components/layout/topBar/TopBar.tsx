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
                    <div className={styling.logo}>
                        <Image
                            src="/logo.svg"
                            alt="website logo"
                            fill
                        />
                    </div>
                </Link>

                <Link
                    href="/projects"
                    className={currentPath === '/projects' ? styling.active : styling.idle}
                >
                    <span className={styling.wrapper}>
                        Projects
                    </span>
                </Link>
            </nav>
        </header>
    );
};

export default TopBar;