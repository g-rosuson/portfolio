import resources from '../resources';

import { IElement } from 'src/components/intro/shared/types';

const getFontClassName = (fontName: string) => {
    const font = resources.fonts.find(({ name }) => name === fontName);
    return font?.file.className;
};

const getStyle = (element: IElement, animationDuration?: number) => {
    return {
        fontSize: `${element.font.size}rem`,
        fontWeight: element.font.weight,
        color: element.font.color,
        animationDuration: `${animationDuration ?? element.animation.duration}ms`,
        // @todo determine easing strategy
        animationTimingFunction: 'cubic-bezier((0,1.5,1,1.5))', // 'cubic-bezier(0.68, -0.55, 0.27, 1.55)' // 'cubic-bezier((0,1.5,1,1.5))'
    };
};

const utils = {
    getFontClassName,
    getStyle,
};

export default utils;
