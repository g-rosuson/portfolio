import { useEffect, useState } from 'react';

import { IElement } from '../../types';

import utils from '../../utils';

import styling from './Sequential.module.css';

const Sequential = ({ element }: { element: IElement }) => {
    // State
    const [{ activeItemIndex }, setState] = useState({
        activeItemIndex: element.animation?.startAt ?? 0,
    });

    useEffect(() => {
        // Check if the active item is the last one in the content string
        // or array, and adjust the check for zero-based indexing
        const roundComplete = activeItemIndex === element.content.length - 1;

        if (roundComplete) {
            return;
        }

        // Divide the animation duration of the element by the length of
        // the element content, to get the animation length of one item
        const intervalDuration = element.animation.duration / element.content.length;

        const interval = setInterval(() => {
            setState((prevState) => {
                // Determine the index of the next active item
                const nextActiveItemIndex = (prevState.activeItemIndex + 1) % element.content.length;

                return {
                    ...prevState,
                    activeItemIndex: nextActiveItemIndex,
                };
            });
        }, intervalDuration);

        return () => {
            clearInterval(interval);
        };
    }, [activeItemIndex, element]);

    const activeItem = element.content[activeItemIndex];

    const animationClassName = element.animation.type;
    const className = `${utils.getFontClassName(element.font.name)} ${animationClassName}`;

    return (
        <div className={styling.container}>
            <div style={utils.getStyle(element)} className={className}>
                {activeItem}
            </div>
        </div>
    );
};

export default Sequential;
