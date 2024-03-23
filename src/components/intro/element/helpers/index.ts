import resources from '../../resources';

import { IElement } from '../../types';

const getConstructedElement = (element: IElement) => {
    // Find the chosen font
    const chosenFont = resources.fonts.find(({ name }) => name === element.font.name);

    // Map the animation type to a CSS class
    const animationClassMap = {
        'fade-in-lower': 'fadeInLower',
    };

    let intervalDuration = element.animation.duration;

    // Since incremental and sequential modes create intervals
    // for each item within an element, we divide the animation
    // duration between the items
    if (['incremental', 'sequential'].includes(element.animation.mode)) {
        intervalDuration = element.animation.duration / element.content.length;
    }

    return {
        content: element.content,
        className: `${chosenFont?.file?.className ?? ''} ${animationClassMap[element.animation.type]}`,
        style: {
            fontWeight: element.font.weight,
            fontSize: element.font.size,
            color: element.font.color,
            animationTimingFunction: 'cubic-bezier((0,1.5,1,1.5))',
            animationDuration: `${intervalDuration}ms`,
        },
        animation: {
            intervalDuration,
            startAt: element.animation?.startAt ?? 0,
            timeout: element.animation?.timeout ?? 0,
        },
    };
};

const helpers = {
    getConstructedElement,
};

export default helpers;
