import { bungee } from 'src/resources/fonts';

import { IBLock, IBlockElement, IFormattedBlock } from '../../types';

/**
 * Formats a style and animation objects for a block element.
 */
const _getFormattedElements = (elements: IBlockElement[]) => {
    return elements.map(({ content, font, animation }) => {
        const fontProps = font ? {
            ...(font.weight && { fontWeight: font.weight }),
            ...(font.size && { fontSize: font.size }),
            ...(font.color && { color: font.color })
        } : {};

        const animationProps = animation ? {
            ...(animation.duration?.amount && { duration: animation.duration.amount }),
            ...(animation.timeout && { timeout: animation.timeout })
        } : {};

        return {
            content,
            style: {
                ...fontProps
            },
            animation: {
                ...animationProps
            }
        };
    });
};

/**
 * Formats the given block so its properties can be
 * easily applied to HTML elements.
 */
const formatBlock = (block: IBLock):IFormattedBlock => {
    // Map the animation type to a CSS class
    const animationClassMap = {
        'fade-in-lower': 'fadeInLower'
    };

    // Determine the chosen font family
    const fontFamilyMap: { [key: string]: string } = {
        bungee: bungee.style.fontFamily
    };

    const fontFamily = fontFamilyMap[block.font.name];

    // Add either the formatted elements or the content
    // string to the formatted block
    const blockAddition = {
        ...(block.elements && {
            elements: _getFormattedElements(block.elements)
        }),
        ...(block.content && {
            content: block.content
        })
    };

    return {
        ...blockAddition,
        className: animationClassMap[block.animation.type],
        style: {
            fontFamily,
            fontWeight: block.font.weight,
            fontSize: block.font.size,
            color: block.font.color,
            animationDuration: `${block.animation.duration.amount}ms`
        },
        animation: {
            duration: block.animation.duration.amount,
            startAt: block.animation?.startAt ?? 0,
            timeout: block.animation?.timeout ?? 0
        }
    };
};

const helpers = {
    formatBlock
};

export default helpers;