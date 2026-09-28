import React, { ReactNode } from 'react';
import { MDXRemote } from 'next-mdx-remote-client/rsc';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { articleDiagrams } from 'src/components/pages/article/diagrams';
import { mdxComponents } from 'src/components/pages/article/mdx/components';
import utils from 'src/utils';

import SectionNav from './sectionNav/SectionNav';
import BackBtn from 'src/components/ui/backBtn/BackBtn';
import Badge from 'src/components/ui/badge/Badge';
import Heading from 'src/components/ui/heading/Heading';

import type { Article } from 'src/shared/types/articles';

import styling from './Article.module.scss';

const BACK_BTN_LABEL = 'Articles';
const DRAFT_BADGE_LABEL = 'Draft';
const READING_TIME_LABEL = 'min read';

type Props = Pick<Article, 'title' | 'date' | 'tags' | 'draft' | 'source' | 'slug' | 'readingTimeMinutes' | 'sections'>

const ArticlePage = ({ title, date, tags, draft, source, slug, readingTimeMinutes, sections }: Props) => {
    return (
        <div className={styling.article}>
            <BackBtn href="/articles" label={BACK_BTN_LABEL}/>

            <section className={styling.tags}>
                {draft && <Badge variant="green">{DRAFT_BADGE_LABEL}</Badge>}

                {tags.map((tag) => (
                    <Badge key={tag}>
                        {tag}
                    </Badge>
                ))}
            </section>

            <Heading level={1} size="lg">
                {title}
            </Heading>

            <div className={styling.info}>
                <span className={styling.infoItem}>{readingTimeMinutes} {READING_TIME_LABEL}</span>
                <time className={styling.infoItem} dateTime={date}>{utils.time.formatIsoDateString(date)}</time>
            </div>

            <MDXRemote
                source={source}
                components={{
                    ...mdxComponents,
                    ...articleDiagrams[slug]
                }}
                options={{
                    mdxOptions: {
                        remarkPlugins: [remarkGfm],
                        rehypePlugins: [rehypeSlug]
                    }
                }}
            />

            <SectionNav sections={sections}/>
        </div>
    );
};

export default ArticlePage;
