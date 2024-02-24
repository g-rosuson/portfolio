import { useEffect, useState } from 'react';

import { IElement } from '../../types';

import utils from '../../utils';

import styling from './Incremental.module.css';

const Incremental = ({ element }: { element: IElement }) => {
    // State
    const [{ items }, setState] = useState(() => {
        // Determine the initial item and its index
        const startAtIndex = element.animation?.startAt ?? 0;

        const animationDuration = element.animation.duration / element.content.length;

        const content = element.content[startAtIndex];

        const animationClassName = element.animation.type;
        const className = `${utils.getFontClassName(element.font.name)} ${animationClassName}`;

        const initialItem = (
            <div key={startAtIndex} style={utils.getStyle(element, animationDuration)} className={className}>
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
        // Divide the animation duration of the element
        // by the length of the element content, to get
        // the animation length of one item
        const animationDuration = element.animation.duration / element.content.length;

        const interval = setInterval(() => {
            setState((prevState) => {
                const nextActiveItemIndex = (prevState.activeItemIndex + 1) % element.content.length;

                const content = element.content[nextActiveItemIndex];

                const animationClassName = element.animation.type;
                const className = `${utils.getFontClassName(element.font.name)} ${animationClassName}`;

                const nextElement = (
                    <div key={nextActiveItemIndex} style={utils.getStyle(element, animationDuration)} className={className}>
                        {content}
                    </div>
                );

                const isAtEnd = prevState.items.length === element.content.length;

                // Reset the items array on element change
                const items = isAtEnd ? [nextElement] : [...prevState.items, nextElement];

                return {
                    ...prevState,
                    activeItemIndex: nextActiveItemIndex,
                    items,
                };
            });
        }, animationDuration);

        return () => {
            clearInterval(interval);
        };
    }, [element]);

    return <div className={styling.container}>{items}</div>;
};

export default Incremental;
