'use client';

import React, { useEffect, useState } from 'react';

import { IConfiguration } from './types';

import Block from './block/Block';

import helpers from './helpers';

import './stylesheets/animation.scss';

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
            let intervalDuration = helpers.getIntervalDuration(activeBlock);

            // If the active block has a defined timeout,
            // add it to the interval duration
            if (!!activeBlock.animation?.timeout) {
                intervalDuration = intervalDuration + activeBlock.animation.timeout;
            }

            const interval = setInterval(() => {
                setState((prevState) => {
                    const nextActiveBlockIndex = (prevState.activeBlockIndex + 1) % configuration.blocks.length;

                    const nextActiveBlock = configuration.blocks[nextActiveBlockIndex];

                    return {
                        ...prevState,
                        activeBlockIndex: nextActiveBlockIndex,
                        activeBlock: nextActiveBlock
                    };
                });
            }, intervalDuration);

            return () => {
                clearInterval(interval);
            };
        }
    }, [activeBlock, activeBlockIndex, configuration]);

    return <Block key={activeBlockIndex} block={activeBlock}/>;
};

export default Carousel;
