import { MDXComponents } from 'next-mdx-remote-client/rsc';

import { HostClientServerDiagram } from 'src/components/pages/article/diagrams/hostClientServerDiagram/HostClientServerDiagram';

import type { Article } from 'src/shared/types/articles';

const articleDiagrams: Partial<Record<Article['slug'], MDXComponents>> = {
    'what-is-mpc': {
        HostClientServerDiagram
    }
};

export { articleDiagrams };
