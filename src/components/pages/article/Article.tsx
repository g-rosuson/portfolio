import React, { ReactNode } from 'react';
import utils from 'src/utils';

import BackBtn from 'src/components/ui/backBtn/BackBtn';
import Badge from 'src/components/ui/badge/Badge';
import Heading from 'src/components/ui/heading/Heading';

import type { Article } from 'src/shared/types/articles';

import styling from './Article.module.scss';

const BACK_BTN_LABEL = 'Articles';
const DRAFT_BADGE_LABEL = 'Draft';

type Props = Pick<Article, 'title' | 'date' | 'tags' | 'draft'> & {
    children: ReactNode;
}

const ArticlePage = ({ title, date, tags, draft, children }: Props) => {
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

            <section>
                <Heading level={1} size="lg" removeMargin>
                    {title}
                </Heading>

                <div className={styling.info}>
                    <span className={styling.infoItem}>5 min read</span>
                    <time className={styling.infoItem} dateTime={date}>{utils.time.formatIsoDateString(date)}</time>
                </div>
            </section>

            <section>{children}</section>
        </div>
    );
};

export default ArticlePage;
