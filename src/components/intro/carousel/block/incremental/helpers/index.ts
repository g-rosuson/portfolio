import { IFormattedBlock } from 'src/components/intro/types';

/**
 * Maps the index of each element to its corresponding timeout within the provided block.
 */
const getElementTimeoutMap = (block: IFormattedBlock) => {
    return (block.elements ?? []).reduce((acc, element, index) => {
        if (element.animation?.timeout) {
            acc[index] = element.animation.timeout;
        }

        return acc;

    }, {} as { [key: number]: number; });
};

const helpers = {
    getElementTimeoutMap
};

export default helpers;