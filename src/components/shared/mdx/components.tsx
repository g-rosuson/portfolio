import React from 'react';
import Image from 'next/image';
import { MDXComponents } from 'next-mdx-remote-client/rsc';

import Heading from 'src/components/ui/heading/Heading';

import styling from './Mdx.module.scss';

const mdxComponents: MDXComponents = {
    h2: ({ id, children }) => (
        <Heading level={2} size="md" id={id}>
            {children}
        </Heading>
    ),
    h3: ({ id, children }) => (
        <Heading level={3} size="sm" id={id}>
            {children}
        </Heading>
    ),
    a: ({ href, children }) => {
        const isExternal = href?.startsWith('http');

        return (
            <a
                href={href}
                className={styling.link}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
            >
                {children}
            </a>
        );
    },
    p: ({ children }) => <p className={styling.paragraph}>{children}</p>,
    img: ({ src, alt }) => {
        if (typeof src !== 'string') {
            return null;
        }

        return <Image className={styling.image} src={src} alt={alt ?? ''} width={800} height={450}/>;
    },
    pre: ({ children }) => <pre className={styling.pre}>{children}</pre>
};

export { mdxComponents };
