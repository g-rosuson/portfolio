import React, { ReactNode } from 'react';
import utils from 'src/utils';

import BackBtn from 'src/components/ui/backBtn/BackBtn';
import Badge from 'src/components/ui/badge/Badge';
import Heading from 'src/components/ui/heading/Heading';

import type { Article } from 'src/shared/types/articles';

import styling from './Article.module.scss';

const BACK_BTN_LABEL = 'Back to articles';

type Props = Pick<Article, 'title' | 'date' | 'tags' | 'draft'> & {
    children: ReactNode;
}

const ArticlePage = ({ title, date, tags, draft, children }: Props) => {
    return (
        <div className={styling.article}>
            <BackBtn href="/articles" label={BACK_BTN_LABEL}/>

            <div className={styling.container}>
                <section className={styling.wrapper}>
                    <div>
                        <Heading level={1} size="lg" removeMargin>
                            {title}
                        </Heading>

                        <time className={styling.date} dateTime={date}>
                            {utils.time.formatIsoDateString(date)}
                        </time>
                    </div>

                    <div className={styling.tags}>
                        {draft && <Badge variant="green">Draft</Badge>}

                        {tags.map((tag) => (
                            <Badge key={tag}>
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </section>

                <section>{children}</section>
            </div>
        </div>

    );
};

export default ArticlePage;
