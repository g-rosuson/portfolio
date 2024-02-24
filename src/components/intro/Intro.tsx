'use client';

import './stylesheets/animation.css';

import React, { useEffect, useState } from 'react';

import Element from './element/Element';

import { IConfiguration } from './types';

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
        // Check if a cycle is complete
        const isAtEnd = activeElementIndex + 1 === configuration.elements.length;

        if (!configuration.loop && isAtEnd) {
            return;
        }

        if (configuration?.mode === 'show-one') {
            const intervalDuration = configuration.elements[activeElementIndex].animation.duration;

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
    }, [activeElement, activeElementIndex]);

    return (
        <div
            style={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Element key={activeElementIndex} element={activeElement} />
        </div>
    );
};

export default Intro;
