'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import Filters from './filters/Filters';
import ArticleCard from 'src/components/pages/articles/articleCard/ArticleCard';
import Placeholder from 'src/components/pages/articles/placeholder/Placeholder';
import Heading from 'src/components/ui/heading/Heading';

import type { Article } from 'src/shared/types/articles';

import styling from './Articles.module.scss';

const DEBOUNCE_MS = 200;
const URL_TAGS_KEY = 'tags';
const URL_SEARCH_TERM_KEY = 'q';
const ARTICLES_HEADING = 'Articles';

interface Props {
    articles: Article[];
}

interface State {
    searchTerm: string;
    tags: string[];
}

const Articles = ({ articles }: Props) => {
    // Hooks
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // State
    const [state, setState] = useState<State>(() => ({
        searchTerm: searchParams.get(URL_SEARCH_TERM_KEY) || '',
        tags: searchParams.get(URL_TAGS_KEY)?.split(',') || []
    }));

    // Refs
    const debounceTimeoutRef = useRef<ReturnType<typeof setTimeout>>();
    const isDebouncingRef = useRef(false);

    /**
     * Determine the available tags from the articles.
     */
    const availableTags = useMemo(() => {
        return Array.from(new Set(articles.flatMap((article) => article.tags)));
    }, [articles]);

    /**
     * Filters articles based on the current search term and selected tags.
     */
    const filteredArticles = useMemo(() => {
        const query = state.searchTerm.trim().toLowerCase();

        return articles.filter((article) => {
            const matchesQuery = !query
                || article.title.toLowerCase().includes(query)
                || article.description.toLowerCase().includes(query)
                || article.tags.some((tag) => tag.toLowerCase().includes(query));

            const matchesTags = state.tags.length === 0
                || state.tags.every((tag) => article.tags.includes(tag));

            return matchesQuery && matchesTags;
        });
    }, [articles, state.searchTerm, state.tags]);

    /**
     * Writes the current search term and selected tags to the URL without adding history entries.
     */
    const writeToUrl = (nextQuery: string, nextTags: string[]) => {
        const params = new URLSearchParams();

        if (nextQuery) {
            params.set('q', nextQuery);
        }

        if (nextTags.length > 0) {
            params.set(URL_TAGS_KEY, nextTags.join(','));
        }

        const queryString = params.toString();
        const href = queryString ? `${pathname}?${queryString}` : pathname;

        router.replace(href, { scroll: false });
    };

    /**
     * Handles search term changes.
     */
    const onSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setState((prev) => ({ ...prev, searchTerm: value }));

        clearTimeout(debounceTimeoutRef.current);
        isDebouncingRef.current = true;

        debounceTimeoutRef.current = setTimeout(() => {
            isDebouncingRef.current = false;
            writeToUrl(value, state.tags);
        }, DEBOUNCE_MS);
    };

    /**
     * Adds or removes a selected tag.
     */
    const onToggleTag = (tag: string) => {
        clearTimeout(debounceTimeoutRef.current);
        isDebouncingRef.current = false;

        const nextTags = state.tags.includes(tag) ? state.tags.filter((item) => item !== tag) : [...state.tags, tag];
        setState((prev) => ({ ...prev, tags: nextTags }));

        writeToUrl(state.searchTerm, nextTags);
    };

    /**
     * Clears the search term and tags from the URL.
     */
    const onClearTags = () => {
        clearTimeout(debounceTimeoutRef.current);
        isDebouncingRef.current = false;

        setState((prev) => ({ ...prev, tags: [] }));

        writeToUrl(state.searchTerm, []);
    };

    /**
     * Syncs local state from the URL on back/forward and shared links.
     * Skipped while a search debounce is in flight so typing is not overwritten.
     */
    useEffect(() => {
        if (isDebouncingRef.current) {
            return;
        }

        const nextSearchTerm = searchParams.get(URL_SEARCH_TERM_KEY) || '';
        const nextTags = searchParams.get(URL_TAGS_KEY)?.split(',') || [];

        setState((prev) => {
            const tagsMatch = prev.tags.length === nextTags.length && prev.tags.every((tag, index) => tag === nextTags[index]);
            const searchTermMatches = prev.searchTerm === nextSearchTerm;

            if (searchTermMatches && tagsMatch) {
                return prev;
            }

            return { searchTerm: nextSearchTerm, tags: nextTags };
        });
    }, [searchParams]);

    /**
     * Clears the debounce timeout on unmount.
     */
    useEffect(() => {
        return () => {
            clearTimeout(debounceTimeoutRef.current);
        };
    }, []);


    // Determine if there are any articles to display after filtering
    const hasFilteredArticles = filteredArticles.length > 0;

    // Determine if there are any articles to display before filtering
    const hasArticles = articles.length > 0;

    // Determine article cards content
    const cards = (
        <div className={styling.cards}>
            {filteredArticles.map((article) => (
                <ArticleCard
                    key={article.slug}
                    slug={article.slug}
                    title={article.title}
                    date={article.date}
                    description={article.description}
                    tags={article.tags}
                    draft={article.draft}
                />
            ))}
        </div>
    );


    return (
        <section>
            <Heading level={1} size="lg">
                {ARTICLES_HEADING}
            </Heading>

            <section className={styling.container}>
                <Filters
                    value={state.searchTerm}
                    tags={availableTags}
                    selectedTags={state.tags}
                    onChange={onSearchTermChange}
                    onToggleTag={onToggleTag}
                    onClearTags={onClearTags}
                    hasArticles={hasArticles}
                />

                {hasFilteredArticles ? cards : <Placeholder hasArticles={hasArticles}/>}
            </section>
        </section>
    );
};

export default Articles;
