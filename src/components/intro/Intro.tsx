'use client';

import React, { useEffect, useState } from 'react';

import Element from './element/Element';

import { IConfiguration } from './types';

import './stylesheets/animation.css';

const Intro = ({ configuration }: { configuration: IConfiguration }) => {
    // State
    const [{ activeElementIndex, activeElement }, setState] = useState(() => {
        const startAtIndex = configuration.startAt ?? 0;

        const initialElement = configuration.elements[startAtIndex];

        return {
            activeElementIndex: startAtIndex,
            activeElement: initialElement,
        };
    });

    useEffect(() => {
        const roundComplete = activeElementIndex === configuration.elements.length - 1;

        // Determine whether to loop over the elements
        if (!configuration.loop && roundComplete) {
            return;
        }

        if (configuration?.mode === 'show-one') {
            // Determine how long an element should be shown
            let intervalDuration = configuration.elements[activeElementIndex].animation.duration;

            // If the active element has a defined timeout,
            // add it to the interval duration
            if (!!activeElement.animation?.timeout) {
                intervalDuration = intervalDuration + activeElement.animation.timeout;
            }

            const interval = setInterval(() => {
                setState((prevState) => {
                    // Determine the index of the next active element
                    const nextActiveElementIndex = (prevState.activeElementIndex + 1) % configuration.elements.length;

                    // Get the next active element
                    const nextActiveElement = configuration.elements[nextActiveElementIndex];

                    return {
                        ...prevState,
                        activeElementIndex: nextActiveElementIndex,
                        activeElement: nextActiveElement,
                    };
                });
            }, intervalDuration);

            return () => {
                clearInterval(interval);
            };
        }
    }, [activeElement, activeElementIndex, configuration]);

    return <Element key={activeElementIndex} element={activeElement} />;
};

export default Intro;
