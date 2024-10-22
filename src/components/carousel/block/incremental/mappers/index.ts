import { FormattedBlock } from 'src/components/carousel/shared/types';

/**
 * Maps the index of each element to its corresponding timeout within the provided block.
 */
const mapToElementTimeoutMap = (block: FormattedBlock) => {
    return (block.elements ?? []).reduce((acc, element, index) => {
        if (element.animation?.timeout) {
            acc[index] = element.animation.timeout;
        }

        return acc;

    }, {} as { [key: number]: number; });
};

const mappers = {
    mapToElementTimeoutMap
};

export default mappers;