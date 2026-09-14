import React from 'react';

import ClearTagsBtn from './clearTagsBtn/ClearTagsBtn';
import FilterChip from './filterChip/FilterChip';
import SearchInput from './searchInput/SearchInput';

import styling from './Filters.module.scss';

interface Props {
    value: string;
    tags: string[];
    selectedTags: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onToggleTag: (tag: string) => void;
    onClearTags: () => void;
}

const Filters = ({ value, tags, selectedTags, onChange, onToggleTag, onClearTags }: Props) => {
    return (
        <section className={styling.filters}>
            <SearchInput value={value} onChange={onChange}/>

            <div className={styling.tags}>
                <ClearTagsBtn onClick={onClearTags}/>

                <div className={styling.chips}>
                    {tags.map((tag) => (
                        <FilterChip
                            key={tag}
                            tag={tag}
                            isSelected={selectedTags.includes(tag)} onToggle={() => onToggleTag(tag)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Filters;