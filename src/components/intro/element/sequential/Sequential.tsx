import { useEffect, useState } from 'react';

import { IConstructedElement } from '../../types';

import styling from './Sequential.module.css';

const Sequential = ({ element }: { element: IConstructedElement }) => {
    // State
    const [{ activeItemIndex }, setState] = useState({
        activeItemIndex: element.meta.startAt,
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
        }, element.meta.intervalDuration);

        return () => {
            clearInterval(interval);
        };
    }, [activeItemIndex, element]);

    const activeItem = element.content[activeItemIndex];

    return (
        <div className={styling.container}>
            <div style={element.style} className={element.meta.className}>
                {activeItem}
            </div>
        </div>
    );
};

export default Sequential;
