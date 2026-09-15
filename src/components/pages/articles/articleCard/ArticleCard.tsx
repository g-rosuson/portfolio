import React from 'react';
import Link from 'next/link';
import utils from 'src/utils';

import Badge from 'src/components/ui/badge/Badge';
import Heading from 'src/components/ui/heading/Heading';

import type { Article } from 'src/shared/types/articles';

import styling from './ArticleCard.module.scss';

const DRAFT_BADGE_LABEL = 'Draft';

export type Props = Pick<Article, 'slug' | 'title' | 'date' | 'description' | 'tags' | 'draft'>;

const ArticleCard = ({ slug, title, date, description, tags, draft }: Props) => {
    return (
        <article className={styling.card}>
            <Link href={`/articles/${slug}`}>
                {!draft && (
                    <div className={styling.draft}>
                        <Badge variant="green">{DRAFT_BADGE_LABEL}</Badge>
                    </div>
                )}

                <div className={styling.wrapper}>
                    <section>
                        <Heading level={2} size="sm" removeMargin>
                            {title}
                        </Heading>

                        <time className={styling.date} dateTime={date}>
                            {utils.time.formatIsoDateString(date)}
                        </time>
                    </section>

                    <section className={styling.tags}>
                        {tags.map((tag) => (
                            <Badge key={tag}>
                                {tag}
                            </Badge>
                        ))}
                    </section>

                    <p className={styling.description}>
                        {description}
                    </p>
                </div>
            </Link>
        </article>
    );
};

export default ArticleCard;
