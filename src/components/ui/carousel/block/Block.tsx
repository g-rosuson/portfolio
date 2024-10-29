import React from 'react';

import Idle from './idle/Idle';
import Incremental from './incremental/Incremental';

import mappers from './mappers';

import { CarouselBlock } from '../shared/types';

import styling from './Block.module.scss';

const Block = ({ block, animateBlock }: { block: CarouselBlock; animateBlock?: boolean }) => {
    const components = {
        incremental: Incremental,
        idle: Idle
    };

    const formattedBlock = mappers.mapToBlock(block);
    const Component = animateBlock ? components[block.animation.mode] || (() => null) : Idle;

    return (
        <div className={styling.container}>
            <Component block={formattedBlock}/>
        </div>
    );
};

export default Block;