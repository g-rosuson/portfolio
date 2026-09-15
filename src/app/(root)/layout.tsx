import React from 'react';
import { cookies } from 'next/headers';
import { jetBrainsMono } from 'src/resources/fonts';

import Layout from 'src/components/shared/layout/Layout';
import ThemeProvider from 'src/components/shared/theme/ThemeProvider';
import TopBar from 'src/components/shared/topBar/TopBar';

import 'src/stylesheets/global.scss';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const stored = cookies().get('theme')?.value;
    const theme = stored === 'light' || stored === 'dark' ? stored : undefined;

    return (
        <html lang="en" data-theme={theme} suppressHydrationWarning>
            <body className={jetBrainsMono.className}>
                <ThemeProvider initialTheme={theme}>
                    <TopBar/>

                    <main>
                        <Layout>
                            {children}
                        </Layout>
                    </main>
                </ThemeProvider>
            </body>
        </html>
    );
}
