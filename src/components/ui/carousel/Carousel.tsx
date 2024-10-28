'use client';

import React, { useEffect, useRef, useState } from 'react';
import storage from 'src/services/storage';

import Block from './block/Block';

import helpers from './helpers';

import { CarouselConfig, State } from './Carousel.types';

import 'src/stylesheets/animation.scss';

const Carousel = ({ configuration }: { configuration: CarouselConfig }) => {
    // State
    const [{ activeBlockIndex, activeBlock }, setState] = useState<State>({
        activeBlockIndex: null,
        activeBlock: null
    });


    // Refs
    const playFromBeginning = useRef(false);
    const isMounted = useRef(false);


    /**
     * Note: This useEffect runs when the component hasn't mounted.
     * Initializes the state for the active block based on storage and configuration settings.
     */
    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;

            // Determine "activeBlockIndex" and "activeBlock" when the carousel
            // is being viewed for the first time or its ID hasn't been persisted
            // due to "configuration.replayOnRevisit === true"
            let activeBlockIndex = configuration.startAt || 0;
            let activeBlock = configuration.blocks[activeBlockIndex];

            // Determine if the carousel ID has been persisted in session storage
            const isCarouselOnList = storage.isCarouselOnList(configuration.id);

            // If the carousel ID is persisted just show the first block
            // that has "block.showOnRevisit === true"
            if (isCarouselOnList) {
                // Find the block that should be shown on revisit
                activeBlockIndex = configuration.blocks.findIndex(block => block.showOnRevisit);

                // If no block is found, default to the block that has
                // "startAt: true" or the first block
                if (activeBlockIndex === -1) {
                    activeBlockIndex = configuration.startAt || 0;
                }

                activeBlock = configuration.blocks[activeBlockIndex];
            }

            if (!isCarouselOnList) {
                // If the carousel ID is not persisted play it from the beginning
                playFromBeginning.current = true;

                // If the carousel ID has not been persisted, and it shouldn't
                // be played on re-visit, add the ID to session storage
                if (!configuration.replayOnRevisit) {
                    storage.addCarouselToList(configuration.id);
                }
            }

            setState(prevState => ({
                ...prevState,
                activeBlockIndex,
                activeBlock
            }));
        }
    }, [configuration]);


    /**
     * Note: This useEffect runs when the component is mounted and the carousel should play all
     * of its blocks.
     * Sets up an interval to automatically cycle through the active blocks in the carousel.
     */
    useEffect(() => {
        if (isMounted.current && playFromBeginning.current && activeBlock && typeof activeBlockIndex === 'number') {
            const roundComplete = activeBlockIndex === configuration.blocks.length - 1;

            // If looping is disabled and the last block is active, exit early
            if (!configuration.loop && roundComplete) {
                return;
            }

            const intervalDuration = helpers.getIntervalDuration(activeBlock);

            // Calculate the index of the next active block, wrapping around if looping is enabled
            const nextActiveBlockIndex = (activeBlockIndex + 1) % configuration.blocks.length;
            const nextActiveBlock = configuration.blocks[nextActiveBlockIndex];

            // Set up an interval to automatically update the active block
            const interval = setInterval(() => {
                setState(prevState => ({
                    ...prevState,
                    activeBlockIndex: nextActiveBlockIndex,
                    activeBlock: nextActiveBlock
                }));
            }, intervalDuration);

            return () => {
                clearInterval(interval);
            };
        }
    }, [activeBlock, activeBlockIndex, configuration]);


    if (activeBlock) {
        return <Block key={activeBlockIndex} block={activeBlock} animateBlock={playFromBeginning.current}/>;
    }

    return null;
};

export default Carousel;
