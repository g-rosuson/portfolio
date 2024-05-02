import { IBLock } from '../types';

const getIntervalDuration = (block: IBLock) => {
    if (block.animation.duration.mode === 'per-character' && !!block.elements?.length) {
        return block.elements.reduce((acc, element) => {
            const durationAmount = element.animation?.duration?.amount ?? block.animation.duration.amount;

            const stringWithoutWhitespace = element.content.replace(/\s/g, '');

            acc += stringWithoutWhitespace.length * durationAmount;

            if (element.animation?.timeout) {
                acc += element.animation.timeout;
            }

            return acc;
        }, 0);
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