import React from 'react';

import styling from './ClearTagsBtn.module.scss';

interface Props {
    onClick: () => void;
}

const CLEAR_TAGS_LABEL = 'Clear tags';
const CLEAR_TAGS_ARIA_LABEL = 'Clear tags';

const ClearTagsBtn = ({ onClick }: Props) => {
    return (
        <button className={styling.clear} onClick={onClick} aria-label={CLEAR_TAGS_ARIA_LABEL}>{CLEAR_TAGS_LABEL}</button>
    );
};

export default ClearTagsBtn;