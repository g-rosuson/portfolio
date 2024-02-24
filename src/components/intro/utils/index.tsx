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
        animationTimingFunction: element.animation.easing,
    };
};

const utils = {
    getFontClassName,
    getStyle,
};

export default utils;
