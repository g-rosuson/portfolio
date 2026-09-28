import React from 'react';
import Link from 'next/link';

import { ChevronLeft } from 'src/components/ui/icons/Icons';

import styling from './BackBtn.module.scss';

type Props = {
    href: string;
    label: string;
}

const BackBtn = ({ href, label }: Props) => {
    return (
        <Link href={href} className={styling.container}>
            <div className={styling.chevron}>
                <ChevronLeft/>
            </div>

            <span className={styling.back}>
                {label}
            </span>
        </Link>
    );
};

export default BackBtn;