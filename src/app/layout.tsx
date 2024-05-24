import React from 'react';
import { inter } from 'src/resources/fonts';

import TopBar from 'src/components/layout/topBar/TopBar';

import './globals.scss';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <TopBar/>

                {children}
            </body>
        </html>
    );
}