import React from 'react';

import styling from './SearchInput.module.scss';


const SEARCH_PLACEHOLDER = 'Search by title, description or tags...';
const SEARCH_ARIA_LABEL = 'Search by title, description or tags';

interface Props {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = ({ value, onChange }: Props) => {
    return (
        <form role="search">
            <input
                type="search"
                className={styling.search}
                value={value}
                placeholder={SEARCH_PLACEHOLDER}
                aria-label={SEARCH_ARIA_LABEL}
                onChange={onChange}
            />
        </form>
    );
};

export default SearchInput;