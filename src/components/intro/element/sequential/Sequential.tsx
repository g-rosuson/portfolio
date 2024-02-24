import { useEffect, useState } from 'react';

import { IElement } from '../../types';

import utils from '../../utils';

const Sequential = ({ element }: { element: IElement }) => {
    // State
    const [{ activeItemIndex }, setState] = useState({
        activeItemIndex: element.animation?.startAt ?? 0,
    });

    useEffect(() => {
        const intervalDuration = element.animation.duration / element.content.length;

        const interval = setInterval(() => {
            setState((prevState) => {
                // Determine the index of the next active item
                const nextActiveElementIndex = (prevState.activeItemIndex + 1) % element.content.length;

                return {
                    ...prevState,
                    activeItemIndex: nextActiveElementIndex,
                };
            });
        }, intervalDuration);

        return () => {
            clearInterval(interval);
        };
    }, [element]);

    const activeElement = element.content[activeItemIndex];

    const animationClassName = element.animation.type;
    const className = `${utils.getFontClassName(element.font.name)} ${animationClassName}`;

    return (
        <div style={utils.getStyle(element)} className={className}>
            {activeElement}
        </div>
    );
};

export default Sequential;
