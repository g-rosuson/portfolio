import { useEffect, useState } from 'react';

import { IConstructedElement } from '../../types';

import styling from './Incremental.module.css';

const Incremental = ({ element }: { element: IConstructedElement }) => {
    // State
    const [{ items, activeItemIndex }, setState] = useState(() => {
        // Determine the initial item and its index
        const startAtIndex = element.animation.startAt;

        const content = element.content[startAtIndex];

        const initialItem = (
            <div key={startAtIndex} style={element.style} className={element.className}>
                {content}
            </div>
        );

        return {
            activeItemIndex: startAtIndex,
            items: [initialItem],
        };
    });

    /**
     * Creates an interval which adds the next active
     * item and its index to the local state.
     */
    useEffect(() => {
        // Check if the active item is the last one in the content string
        // or array, and adjust the check for zero-based indexing
        const roundComplete = activeItemIndex === element.content.length - 1;

        if (roundComplete) {
            return;
        }

        const interval = setInterval(() => {
            setState((prevState) => {
                const nextActiveItemIndex = (prevState.activeItemIndex + 1) % element.content.length;

                const content = element.content[nextActiveItemIndex];

                const nextItem = (
                    <div key={nextActiveItemIndex} style={element.style} className={element.className}>
                        {content}
                    </div>
                );

                const roundComplete = prevState.items.length === element.content.length;

                // Reset the items array on element change
                const items = roundComplete ? [nextItem] : [...prevState.items, nextItem];

                return {
                    ...prevState,
                    activeItemIndex: nextActiveItemIndex,
                    items,
                };
            });
        }, element.animation.intervalDuration);

        return () => {
            clearInterval(interval);
        };
    }, [activeItemIndex, element]);

    // The skeleton creates the total width of the active element, causing its
    // items to start at either end and eventually fill a centered container.
    const skeleton = (
        <div style={{ ...element.style, color: 'transparent' }} className={element.className}>
            {element.content}
        </div>
    );

    return (
        <div className={styling.container}>
            <div className={styling.wrapper}>
                {skeleton}

                <div className={styling.items}>{items}</div>
            </div>
        </div>
    );
};

export default Incremental;
