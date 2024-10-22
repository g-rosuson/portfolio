import { CarouselBlock } from '../shared/types';

const getIntervalDuration = (block: CarouselBlock) => {
    if (block.animation.duration.mode === 'per-character' && block.elements?.length) {
        let elementsIntervalDuration = block.elements.reduce((acc, element) => {
            // Use the block animation duration if it's not
            // defined on an element level
            const durationAmount = element.animation?.duration?.amount ?? block.animation.duration.amount;

            const stringWithoutWhitespace = element.content.replace(/\s/g, '');

            acc += stringWithoutWhitespace.length * durationAmount;

            if (element.animation?.timeout) {
                acc += element.animation.timeout;
            }

            return acc;
        }, 0);

        // If the block has a defined timeout,
        // add it to the interval duration
        if (block.animation.timeout) {
            elementsIntervalDuration += block.animation.timeout;
        }

        return elementsIntervalDuration;
    }

    if (block.animation.duration.mode === 'per-character' && !!block.content) {
        return block.content.length * block.animation.duration.amount;
    }

    if (block.animation.duration.mode === 'per-element' && !!block.elements?.length) {
        return block.elements.length * block.animation.duration.amount;
    }

    return block.animation.duration.amount;
};

const helpers = {
    getIntervalDuration
};

export default helpers;