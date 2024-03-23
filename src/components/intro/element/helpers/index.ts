import resources from '../../resources';

import { IElement } from '../../types';

const getConstructedElement = (element: IElement) => {
    // Find the chosen font
    const chosenFont = resources.fonts.find(({ name }) => name === element.font.name);

    // Map the animation type to a CSS class
    const animationClassMap = {
        'fade-in-lower': 'fadeInLower',
    };

    // Determine elements that divide the animation duration
    // between their content items
    const elementsWithDividedDuration = ['incremental', 'sequential'];

    // Determine if the animation duration should be divided
    // between each item contained within an element
    const divideDurationBetweenItems = elementsWithDividedDuration.includes(element.animation.mode);

    let intervalDuration = element.animation.duration;

    if (divideDurationBetweenItems) {
        intervalDuration = element.animation.duration / element.content.length;
    }

    return {
        content: element.content,
        style: {
            fontWeight: element.font.weight,
            fontSize: `${element.font.size}rem`,
            color: element.font.color,
            animationTimingFunction: 'cubic-bezier((0,1.5,1,1.5))',
            animationDuration: `${intervalDuration}ms`,
        },
        meta: {
            intervalDuration,
            className: `${chosenFont?.file?.className ?? ''} ${animationClassMap[element.animation.type]}`,
            startAt: element.animation?.startAt ?? 0,
            timeout: element.animation?.timeout ?? 0,
        },
    };
};

const helpers = {
    getConstructedElement,
};

export default helpers;
