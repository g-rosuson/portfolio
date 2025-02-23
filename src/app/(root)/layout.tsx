import React from 'react';
import { getTheme } from 'src/lib/theme';
import { jetBrainsMono } from 'src/resources/fonts';

import Layout from 'src/components/shared/layout/Layout';
import TopBar from 'src/components/shared/topBar/TopBar';

import 'src/stylesheets/global.scss';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{ __html: getTheme }}/>
            </head>

            <body className={jetBrainsMono.className}>
                <TopBar/>

                <main>
                    <Layout>
                        {children}
                    </Layout>
                </main>
            </body>
        </html>
    );
}