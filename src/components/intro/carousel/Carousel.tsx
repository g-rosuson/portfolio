import React, { useEffect, useState } from 'react';

import Block from './block/Block';

import helpers from '../helpers';

import { IConfiguration } from '../types';

import 'src/stylesheets/animation.scss';

const Carousel = ({ configuration }: { configuration: IConfiguration }) => {
    const [{ activeBlockIndex, activeBlock }, setState] = useState(() => {
        const startAtIndex = configuration.startAt ?? 0;

        const initialBlock = configuration.blocks[startAtIndex];

        return {
            activeBlockIndex: startAtIndex,
            activeBlock: initialBlock
        };
    });


    useEffect(() => {
        const roundComplete = activeBlockIndex === configuration.blocks.length - 1;

        if (!configuration.loop && roundComplete) {
            return;
        }

        if (configuration?.mode === 'show-one') {
            const timeoutDuration = helpers.getTimeoutDuration(activeBlock);

            const timeout = setTimeout(() => {
                setState((prevState) => {
                    const nextActiveBlockIndex = (prevState.activeBlockIndex + 1) % configuration.blocks.length;

                    const nextActiveBlock = configuration.blocks[nextActiveBlockIndex];

                    return {
                        ...prevState,
                        activeBlockIndex: nextActiveBlockIndex,
                        activeBlock: nextActiveBlock
                    };
                });
            }, timeoutDuration);

            return () => {
                clearTimeout(timeout);
            };
        }
    }, [activeBlock, activeBlockIndex, configuration]);


    return <Block key={activeBlockIndex} block={activeBlock}/>;
};

export default Carousel;
