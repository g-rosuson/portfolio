import React from 'react';

import Incremental from './incremental/Incremental';

import helpers from './helpers';

import { IBLock } from '../../types';

const Block = ({ block }: { block: IBLock }) => {
    const components = {
        incremental: Incremental
    };

    const formattedBlock = helpers.formatBlock(block);
    const Component = components[block.animation.mode];

    return <Component block={formattedBlock}/>;
};

export default Block;