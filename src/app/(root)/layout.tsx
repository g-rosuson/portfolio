import React from 'react';
import { inter } from 'src/resources/fonts';

import TopBar from 'src/components/layout/topBar/TopBar';

import '../../stylesheets/global.scss';
import styling from './Layout.module.scss';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <TopBar/>

                <div className={styling.wrapper}>
                    {children}
                </div>
            </body>
        </html>
    );
}