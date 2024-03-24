import { useEffect, useState } from 'react';

import { IFormattedElement } from '../../types';

import styling from './Sequential.module.css';

const Sequential = ({ element }: { element: IFormattedElement }) => {
    // State
    const [{ activeItemIndex }, setState] = useState({
        activeItemIndex: element.animation.startAt,
    });

    useEffect(() => {
        // Check if the active item is the last one in the content string
        // or array, and adjust the check for zero-based indexing
        const roundComplete = activeItemIndex === element.content.length - 1;

        if (roundComplete) {
            return;
        }

        const interval = setInterval(() => {
            setState((prevState) => {
                // Determine the index of the next active item
                const nextActiveItemIndex = (prevState.activeItemIndex + 1) % element.content.length;

                return {
                    ...prevState,
                    activeItemIndex: nextActiveItemIndex,
                };
            });
        }, element.animation.intervalDuration);

        return () => {
            clearInterval(interval);
        };
    }, [activeItemIndex, element]);

    const activeItem = element.content[activeItemIndex];

    return (
        <div className={styling.container}>
            <div key={activeItemIndex} style={element.style} className={element.className}>
                {activeItem}
            </div>
        </div>
    );
};

export default Sequential;
