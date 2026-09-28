import React from 'react';

import type { Article } from 'src/shared/types/articles';

import styling from './SectionNav.module.scss';

const NAV_LABEL = 'Article sections';

type Props = {
    sections: Article['sections'];
}

const SectionNav = ({ sections }: Props) => {
    if (!sections.length) {
        return null;
    }

    return (
        <nav className={styling.nav} aria-label={NAV_LABEL}>
            <div className={styling.stack}>
                {sections.map(({ id, title }) => (
                    <a key={id} href={`#${id}`} className={styling.link}>
                        <span className={styling.label}>{title}</span>
                        <span className={styling.bar} aria-hidden/>
                    </a>
                ))}
            </div>
        </nav>
    );
};

export default SectionNav;
