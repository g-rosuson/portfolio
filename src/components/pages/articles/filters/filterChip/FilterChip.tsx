import React from 'react';

import styling from './FilterChip.module.scss';

interface Props {
    tag: string;
    isSelected: boolean;
    onToggle: () => void;
}

const FilterChip = ({ tag, isSelected, onToggle }: Props) => {
    return (
        <button
            key={tag}
            className={styling.chip}
            data-selected={isSelected}
            aria-pressed={isSelected}
            onClick={onToggle}
        >
            {tag}
        </button>
    );
};

export default FilterChip;