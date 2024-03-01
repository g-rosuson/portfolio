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

                const nextItem = (
                    <div key={nextActiveItemIndex} style={utils.getStyle(element, animationDuration)} className={className}>
                        {content}
                    </div>
                );

                const isAtEnd = prevState.items.length === element.content.length;

                // Reset the items array on element change
                const items = isAtEnd ? [nextItem] : [...prevState.items, nextItem];

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

    // Creates the total width of the active element, causing its items
    // to start at either end and eventually fill a centered container.
    const skeletonStyle = {
        fontSize: `${element.font.size}rem`,
        fontWeight: element.font.weight,
        color: 'transparent',
    };

    const skeleton = (
        <div style={skeletonStyle} className={`${utils.getFontClassName(element.font.name)}`}>
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
